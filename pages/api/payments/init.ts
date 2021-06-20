import { getServerSideStripe } from './../../../lib/stripe';
import { getSession } from 'next-auth/client';
/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllStages, getEventDetails } from '@lib/cms-api';
import { SITE_ORIGIN } from "@lib/constants";
import { dbManager } from "@lib/database";
// Number of seconds to cache the API response for

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-var-requires

const EXPIRES_SECONDS = 5;
const YOUR_DOMAIN = SITE_ORIGIN
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const eventId = JSON.parse(req.body).eventId;
		const paymentMethodId = JSON.parse(req.body).paymentMethodId;
		const eventDetail = await getEventDetails(eventId);

		const session = await getSession({ req });
		const users = await dbManager.getModel("User");
		const user = await users.findOne(session?.user?.userId) as any;
		console.log("user.stripeCustomerId", user?.stripeCustomerId);


		const stripe = getServerSideStripe();

		const paymentMethods = await stripe.paymentMethods.list({
			customer: user?.stripeCustomerId,
			type: 'card',
		});

		console.log("payment methods", paymentMethods)
		const paymentIntent = await stripe.paymentIntents.create({
			amount: Number(eventDetail.price) * 100,
			currency: 'eur',
			// payment_method: paymentMethodId,
			customer: user?.stripeCustomerId,
			// confirmation_method: 'manual',
			// confirm: true,
			metadata: {
				eventId: eventId
			}
			// setup_future_usage: 'on_session'
		});

		res.json({ clientSecret: paymentIntent.client_secret })
		// Process a POST request
		// try {
		// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		// 	const session = await stripe.checkout.sessions.create({
		// 		payment_method_types: ['card'],
		// 		line_items: [
		// 			{
		// 				price_data: {
		// 					currency: 'usd',
		// 					product_data: {
		// 						name: 'Stubborn Attachments',
		// 						images: ['https://i.imgur.com/EHyR2nP.png'],
		// 					},
		// 					unit_amount: 2000,
		// 				},
		// 				quantity: 1,
		// 			},
		// 		],
		// 		mode: 'payment',
		// 		success_url: `${YOUR_DOMAIN}/purchase-success`,
		// 		cancel_url: `${YOUR_DOMAIN}/purchase-cancel`,
		// 	});

		// 	res.status(200).json({ id: session.id })
		// } catch (e) {
		// 	// eslint-disable-next-line no-console
		// 	console.log(e);

		// 	return res.status(500).json({
		// 		error: {
		// 			code: 'server_error',
		// 			message: 'Internal server error'
		// 		}
		// 	});
		// }
	}
	else {
		res.status(304).send({})
	}
}


// const generateResponse = async (intent: { status: any; client_secret: any; id: any; }, paymentMethodId: any, userId: any, seetId: any) => {
// 	console.log('intent', intent)
// 	// Generate a response based on the intent's status
// 	switch (intent.status) {
// 		case "requires_action":
// 		case "requires_source_action":
// 		case "requires_confirmation":
// 			// Card requires authentication
// 			return {
// 				requiresAction: true,
// 				clientSecret: intent.client_secret
// 			};
// 		case "requires_payment_method":
// 		case "requires_source":
// 			// Card was not properly authenticated, suggest a new payment method
// 			return {
// 				error: "Your card was denied, please provide a new payment method"
// 			};
// 		case "succeeded":
// 		// const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
// 		// // save user payment method for future usage
// 		// // await db.newStripePaymentMethod(userId, paymentMethodId, paymentMethod.card.brand, `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`, paymentMethod.card.last4)
// 		// // await db.newStripePayment(userId, seetId, paymentMethodId, intent.id)
// 		// console.log("calling book event online from stripe success with the following data ", {
// 		// 	paymentMethod: 'stripe',
// 		// 	stripeOrderid: intent.id,
// 		// 	brand: paymentMethod.card.brand,
// 		// 	exp: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
// 		// 	last4: paymentMethod.card.last4,
// 		// 	paymentMethodId
// 		// }, seetId, userId)

// 		// const eventDetail = await db.bookEventOnline(
// 		//     {
// 		//         paymentMethod: 'stripe',
// 		//         stripeOrderid: intent.id,
// 		//         brand: paymentMethod.card.brand,
// 		//         exp: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
// 		//         last4: paymentMethod.card.last4,
// 		//         paymentMethodId
// 		//     },
// 		//     seetId,
// 		//     userId
// 		// )
// 		// console.log('Booked event details ==> ', eventDetail)

// 		// if (!eventDetail)
// 		//     return {
// 		//         result: false,
// 		//         message: 'err'
// 		//     }
// 		// ioProducer.ticketSoldOnEvent(eventDetail.id)

// 		// let eventDetail = await db.getBookedEventDetail(userId, booked.code)

// 		// const eventDate = new Date(eventDetail.date)
// 		// const formattedEventDate = `${('0' + eventDate.getDate()).slice(-2)}/${('0' + (eventDate.getMonth() + 1)).slice(-2)}/${eventDate.getFullYear()}`;

// 		// const eventImages = await db.getEventImages(seetId)
// 		// const position = await db.getUserPosition(userId, seetId)

// 		// console.log("event link", `${process.env.DOMAIN_EVENT_ROOT}/events/${eventDetail.id}`)
// 		// const emailSender = new EmailSender(EmailSender.TEMPLATES.EVENT_BOOKED_ALERT, {
// 		//     "artistName": eventDetail.artistName,
// 		//     "eventName": eventDetail.title,
// 		//     "eventDescription": eventDetail.description,
// 		//     "eventDate": formattedEventDate,
// 		//     "eventTime": `${('0'+eventDate.getHours()).slice(-2)}:${('0'+eventDate.getMinutes()).slice(-2)}`,
// 		//     "eventUrl": `${process.env.DOMAIN_EVENT_ROOT}/events/${eventDetail.id}`,
// 		//     "artistImage": `${process.env.ARTISTS_IMAGES_URL}${eventDetail.artistPicture}`
// 		// })
// 		// emailSender.sendTo(eventDetail.userEmail)
// 		// return {
// 		//     result: true,
// 		//     requiresAction: false,
// 		//     data: {
// 		//         seet: {
// 		//             id: eventDetail.id,
// 		//             title: eventDetail.title,
// 		//             description: eventDetail.description,
// 		//             longDescription: eventDetail.longDescription,
// 		//             date: eventDetail.date,
// 		//             price: eventDetail.price,
// 		//             totalTickets: eventDetail.totalTickets,
// 		//             availableTickets: eventDetail.availableTickets,
// 		//             duration: eventDetail.duration,
// 		//             type: eventDetail.type,
// 		//             tokens: eventDetail.tokens,
// 		//             eventImages: eventImages.map(u => process.env.EVENTS_IMAGES_URL + u.url)
// 		//         },
// 		//         jitsiCode: eventDetail.jitsiCode,
// 		//         queuePosition: position
// 		//     }
// 		// };

// 	}
// };