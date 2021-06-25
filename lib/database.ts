/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import entities from "../entities/index";
import { Vouchers } from "entities/Vouchers";
import User from "models/User";
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { SnakeCaseNamingStrategy } from "./db/namingStrategies";

let connection: Connection
const _typeorm = require("typeorm");
const _StringUtils = require("typeorm/util/StringUtils");

// we have to use the same NamingStrategy as next-auth
// node_modules/@next-auth/typeorm-legacy-adapter/dist/lib/naming-strategies.js


type Connections = "app" | "nextauth"
const getConnection = async (name = "app") => {
	try {
		const conns = getConnectionManager().connections;
		console.log("entities", entities),
			conns.forEach((conn) => {
				console.log("connection name", conn.name)
				conn.entityMetadatas.forEach((meta) => console.log("meta", meta.name))
			})
		connection = getConnectionManager().get(name);
	} catch (err) {
		try {
			connection = await createConnection({
				name: name,
				type: "mysql",
				host: process.env.DB_URL,
				port: Number(process.env.DB_PORT),
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				entities: entities,
				namingStrategy: new SnakeCaseNamingStrategy() as any
			});
			await connection.synchronize()
		} catch (err) {
			console.error("error creating connection")
			throw err;
		}
	}
	return connection
}
type Models = "User" | "Events" | "Booking"
const getModel = async <T = any>(model: Models, connectionName: Connections = "app") => {
	const conn = await getConnection(connectionName);
	return conn.getRepository<T>(model)
}

export const dbManager = { getConnection, getModel }