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
		if (macroArea === "data") {
			const modelName = pieces?.[1] as any;
			try {
				const data = await dbManager.getRepository<MyEvent>(modelName);
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

		// const queryData = parseQueryStringMiddleware(req);
		if (pieces) {
			const macroArea = pieces?.[0];
			if (macroArea === "data") {
				const modelName = pieces[1].split("?")[0] as any
				try {
					const repo = await dbManager.getRepository(modelName);

					const found = await repo.find({
						// relations: queryData.relations,
						// skip: queryData.offset,
						// take: queryData.limit,
						// where: queryData.whereClause,
						// order: queryData.orderClause
					})
					const data2 = await repo.createQueryBuilder(modelName)
						.where("id=1")
						// .select("id")
						.getOne()
					console.log("foubd ", found)
					return res.json({ result: true, data: found })
				} catch (err) {
					console.error("an erroro occured", err)
					return false;
				}
			}
		}
		// console.log("")
		// res.json({ result: true })

		// const data = await dbManager.getModel("bookings");
		// console.log("data")
	}
	return res.status(400).json({ error: "nothing to do" })




}



/**
 * This middleware looks for variours  query string parameters called "orderby"
 * and fills the request object with objects ready to be used in
 * typeorm's options (order,select ecc).
 *
 * QUERY STRING PARAMETER: orderby
 * EXPECTED FORMAT
 * A json array of string, where each string can contain the column names
 * separated by comma and the order direction separated by a space
 * EXAMPLE
 * ["field1,field2 ASC" , "field3" , "field4 DESC"]
 *
 * QUERY STRING PARAMETER: select
 * EXPECTED FORMAT
 * A string with the column names separated by comma
 * EXAMPLE
 * field1,field2,field3
 */
export type RestQueryOptions = {
	orderClause?: { [key: string]: "ASC" | "DESC" };
	selectClause?: string[];
	whereClause?: string;
	relations?: string[];
	limit?: number;
	offset?: number;
};
const parseQueryStringMiddleware = (req: any): RestQueryOptions => {
	/**
	 * PARSE ORDER BY CLAUSE
	 */
	const offset = req.query.offset;
	(req).offset = offset;
	const limit = req.query.limit;
	(req).limit = limit;
	const orderByClause = req.query["orderby"];
	if (orderByClause) {
		const orderOptions: { [key: string]: string } = {};
		const clauseObj = JSON.parse(orderByClause) as string[];
		clauseObj.forEach(clause => {
			const valueAndDirection = clause.split(" ");
			let colsArray: string[] = [];
			let orderDirection = "ASC";
			if (valueAndDirection.length > 0) {
				const cols = valueAndDirection[0];
				colsArray = cols.split(",");
			}
			if (valueAndDirection.length > 1) {
				orderDirection = (valueAndDirection[1] || "ASC").toUpperCase();
			}
			colsArray.forEach(col => {
				orderOptions[col] = orderDirection;
			});
		});
		(req).orderOptions = orderOptions;
	}

	/**
	 * PARSE SELECT CLAUSE
	 */
	const selectClause: string[] = req.query["select"]?.split(",");
	// if (selectClause) {
	// 	const fields = selectClause.split(",");
	// 	(req).selectOptions = fields;
	// }

	/**
	 * PARSE RELATIONS CLAUSE
	 */
	const relations: string[] = req.query["relations"]?.split(",");
	// if (relationClause) {
	// 	const relations = relationClause.split(",");
	// 	(req).relations = relations;
	// }

	/**
	 * PARSE WHERE CLAUSE
	 */
	const whereClause: any = req.query["where"] ? JSON.parse(req.query["where"]) : undefined;
	// try {
	// 	const parsed = JSON.parse(whereClause);
	// 	(req).where = parsed;
	// } catch (e) {
	// 	(req).where = whereClause;
	// }

	return {
		whereClause,
		selectClause,
		relations,
		orderClause: orderByClause,
		offset,
		limit
	}
};
