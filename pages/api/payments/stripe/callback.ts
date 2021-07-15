import { dbManager } from '@lib/database';
import { Booking } from "entities/Bookings";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from 'next';
import { getConnectionManager } from 'typeorm';
import { getServerSideStripe } from 'lib/stripe-ss';
import * as securePin from "secure-pin";
export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			console.log("stripe callback", req.body)
			const stripe = getServerSideStripe();
			const buf = await buffer(req) as string;
			const sig = req.headers['stripe-signature'];
			//@ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-var-requires


			let event;

			try {
				// event = stripe.webhooks.constructEvent(payload, sig!, "whsec_1CpuhvDY5tqEHU0WqvPSCgXEg6mSCCM0");
				event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
				console.log("stripe signature callback verified", event)
			} catch (err) {
				return res.status(400).send(`Webhook Error: ${err.message}`);
			}



			const callbackData = JSON.parse(buf);

			// Handle the event
			switch (callbackData.type) {
				case 'payment_intent.succeeded':
				case "checkout.session.completed":
					const paymentIntent = callbackData.data.object;
					console.log('PaymentIntent was successful!');

					const metadata: any | undefined = callbackData.data.object.metadata;
					console.log("metadata", metadata)
					const seetingEventId = metadata.eventId;

					const usersRepo = await dbManager.getRepository("users");
					const user = await usersRepo.findOne({ where: { stripeCustomerId: callbackData.data.object.customer } })
					if (user) {
						const bookingsRepo = await dbManager.getRepository<Booking>("bookings");
						const bookingByPaymentId = await bookingsRepo.findOne({ paymentId: callbackData.data.object.id })
						if (!bookingByPaymentId) {
							const pinCode = securePin.generatePinSync(6)
							const booking: Partial<Booking> = {
								userId: user.id,
								eventId: Number(seetingEventId),
								paymentType: "stripe",
								paymentId: callbackData.data.object.id,
								pinCode,
								bookedDate: new Date()
							}
							// const createResult = await bookings.save({ userId: user?.id, eventId: Number(seetingEventId), paymentType: "stripe", paymentId: callbackData.data.object.id });
							const createResult = await bookingsRepo.save(booking);
							console.log("created", createResult)
						}
					}

					res.status(200).json({ result: true });

					break;
				case 'payment_method.attached':
					const paymentMethod = callbackData.data.object;
					console.log('PaymentMethod was attached to a Customer!');
					break;
				// ... handle other event types
				default:
					return res.status(200).send(`Unhandled event type ${callbackData.type}`)
			}
		} catch (err) {
			console.error("error in request", err);
			res.status(400)
		}


	}
	else {
		res.status(304).send({})
	}
}


