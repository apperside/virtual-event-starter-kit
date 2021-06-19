import { getConnectionManager } from 'typeorm';
import { dbManager } from '@lib/database';
import { getServerSideStripe } from './../../../../lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		console.log("stripe callback", req.body)
		const stripe = getServerSideStripe();
		const payload = req.body;
		const sig = req.headers['stripe-signature'];

		const metadata: any | undefined = payload.data.object.metadata;
		console.log("metadata", metadata)
		const eventId = metadata.eventId;
		const conns = getConnectionManager().connections;
		const users = await dbManager.getModel("User");
		const user = await users.findOne({ where: { stripeCustomerId: payload.data.object.customer } }) as any
		const bookings = await dbManager.getModel("Booking");
		const createResult = await bookings.save({ userId: user?.id, eventId, paymentType: "stripe", paymentId: payload.data.object.id });

		let event;

		try {
			event = stripe.webhooks.constructEvent(payload, sig!, "whsec_1CpuhvDY5tqEHU0WqvPSCgXEg6mSCCM0");
			console.log("event", event)
		} catch (err) {
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}

		res.status(200);
	}
	else {
		res.status(304).send({})
	}
}

