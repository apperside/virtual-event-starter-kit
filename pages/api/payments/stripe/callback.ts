import { getConnectionManager } from 'typeorm';
import { dbManager } from '@lib/database';
import { getServerSideStripe } from './../../../../lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from "micro";
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
			const payload = req.body;
			const buf = await buffer(req);
			const sig = req.headers['stripe-signature'];
			//@ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-var-requires


			let event;

			try {
				// event = stripe.webhooks.constructEvent(payload, sig!, "whsec_1CpuhvDY5tqEHU0WqvPSCgXEg6mSCCM0");
				event = stripe.webhooks.constructEvent(buf, sig!, "whsec_Qd2vDHtn4bnoG418aFVxh89H2RKNQvsd");
				console.log("event", event)
			} catch (err) {
				return res.status(400).send(`Webhook Error: ${err.message}`);
			}



			const eventData = req.body;

			// Handle the event
			switch (eventData.type) {
				case 'payment_intent.succeeded':
					const paymentIntent = eventData.data.object;
					console.log('PaymentIntent was successful!');

					const metadata: any | undefined = payload.data.object.metadata;
					console.log("metadata", metadata)
					const eventId = metadata.eventId;
					const conns = getConnectionManager().connections;
					const users = await dbManager.getModel("User");
					const user = await users.findOne({ where: { stripeCustomerId: payload.data.object.customer } }) as any
					const bookings = await dbManager.getModel("Booking");
					const bookingByPaymentId = await bookings.findOne({ paymentId: payload.data.object.id })
					if (!bookingByPaymentId) {
						const createResult = await bookings.save({ userId: user?.id, eventId, paymentType: "stripe", paymentId: payload.data.object.id });
					}

					let event;

					try {
						// event = stripe.webhooks.constructEvent(payload, sig!, "whsec_1CpuhvDY5tqEHU0WqvPSCgXEg6mSCCM0");
						event = stripe.webhooks.constructEvent(payload, sig!, "whsec_Qd2vDHtn4bnoG418aFVxh89H2RKNQvsd");
						console.log("event", event)
					} catch (err) {
						return res.status(400).send(`Webhook Error: ${err.message}`);
					}

					res.status(200);

					break;
				case 'payment_method.attached':
					const paymentMethod = eventData.data.object;
					console.log('PaymentMethod was attached to a Customer!');
					break;
				// ... handle other event types
				default:
					return res.status(400).send(`Unhandled event type ${eventData.type}`)
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

