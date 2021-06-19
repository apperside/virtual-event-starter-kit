import { getSession } from 'next-auth/client';
import { dbManager } from '@lib/database';

import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllStages } from '@lib/cms-api';
import { SITE_ORIGIN } from "@lib/constants";
// Number of seconds to cache the API response for

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-var-requires
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const db_bookings = await dbManager.getModel("Booking");
		const session = await getSession({ req });
		const bookings = await db_bookings.find({ userId: session?.user?.userId })
		console.log("bookings", bookings.length);
		res.json(bookings);

	}
	else {
		res.status(304).send({})
	}
}
