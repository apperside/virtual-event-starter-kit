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
import { getAllStages } from '@lib/cms-api';
// Number of seconds to cache the API response for

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripeLib = require('stripe')
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const stripe = stripeLib('sk_test_51IdwlJCgP78hQYYm0aq45VHUHCF2AoB19sHHOCCEsSXeilNoljEoh5HiKgRTuLwBl3korOVhtdmZD4oPhZFKRlAR00jMuS3kSB');
const EXPIRES_SECONDS = 5;
const YOUR_DOMAIN = "http://localhost:3000"
export default async function createCheckoutSession(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		// Process a POST request
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price_data: {
							currency: 'usd',
							product_data: {
								name: 'Stubborn Attachments',
								images: ['https://i.imgur.com/EHyR2nP.png'],
							},
							unit_amount: 2000,
						},
						quantity: 1,
					},
				],
				mode: 'payment',
				success_url: `${YOUR_DOMAIN}/purchase-success`,
				cancel_url: `${YOUR_DOMAIN}/purchase-cancel`,
			});

			res.status(200).json({ id: session.id })
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);

			return res.status(500).json({
				error: {
					code: 'server_error',
					message: 'Internal server error'
				}
			});
		}
	}
	else {
		res.status(304).send({})
	}
}
