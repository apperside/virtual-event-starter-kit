import { Event } from './../../../lib/types';
import { dbManager } from './../../../lib/database';
import { NextApiRequest, NextApiResponse } from "next";

type MyEvent = { id: number, name: string }
export default async function ticketImages(req: NextApiRequest, res: NextApiResponse) {

	const url = req.url?.replace("/api/rest/", "");
	console.log("url is", url)
	const query = req.query;
	const pieces = url?.split("/")
	console.log("url pieces are", pieces)
	if (req.method === "POST") {

		const macroArea = pieces?.[0];
		if (macroArea === "models") {
			const modelName = pieces?.[1] as any;
			try {
				const data = await dbManager.getModel<MyEvent>(modelName);
				const entity = data.create(req.body);
				const result = await data.save(entity)


				return res.json({ result: true, data: result })


			} catch (err) {
				console.error("an erroro occured", JSON.stringify(err))
				return res.status(500).json({ error: err.message })
			}
		}
	}
	else if (req.method === "GET") {
		const pieces = url?.split("/")

		const macroArea = pieces?.[0];
		if (macroArea === "models") {
			const modelName = pieces?.[1] as any;
			try {
				const data = await dbManager.getModel(modelName);

				const found = await data.find()
				console.log("foubd ", found)
				return res.json({ result: true, data: found })
			} catch (err) {
				console.error("an erroro occured", err)
				return false;
			}
		}
		// console.log("")
		// res.json({ result: true })

		// const data = await dbManager.getModel("Booking");
		// console.log("data")
	}
	return res.status(400).json({ error: "nothing to do" })




}