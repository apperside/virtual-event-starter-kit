import { NextApiRequest, NextApiResponse } from "next";

export default async function ticketImages(req: NextApiRequest, res: NextApiResponse) {

	console.log("url is", req.url)
	return res.status(200).json({ result: true })




}