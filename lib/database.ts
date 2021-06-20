/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BookingEntity } from "models/Booking";
import { EventEntity } from "models/Event";
import { UserSchema } from "models/User";
import { EntitySchema } from 'typeorm';
import { createConnection } from 'typeorm';
import { getConnectionManager } from 'typeorm';
import { Connection } from 'typeorm';

let connection: Connection
const _typeorm = require("typeorm");
const _StringUtils = require("typeorm/util/StringUtils");

// we have to use the same NamingStrategy as next-auth
// node_modules/@next-auth/typeorm-legacy-adapter/dist/lib/naming-strategies.js
class SnakeCaseNamingStrategy extends _typeorm.DefaultNamingStrategy {
	tableName(className: any, customName: any) {
		//@ts-ignore
		return customName || (0, _StringUtils.snakeCase)(`${className}s`);
	}

	columnName(propertyName: any, customName: any, embeddedPrefixes: any[]) {
		//@ts-ignore
		return `${(0, _StringUtils.snakeCase)(embeddedPrefixes.join("_"))}${customName || (0, _StringUtils.snakeCase)(propertyName)}`;
	}

	relationName(propertyName: any) {
		//@ts-ignore
		return (0, _StringUtils.snakeCase)(propertyName);
	}

	joinColumnName(relationName: any, referencedColumnName: any) {
		//@ts-ignore
		return (0, _StringUtils.snakeCase)(`${relationName}_${referencedColumnName}`);
	}

	joinTableName(firstTableName: any, secondTableName: any, firstPropertyName: string, secondPropertyName: any) {
		//@ts-ignore
		return (0, _StringUtils.snakeCase)(`${firstTableName}_${firstPropertyName.replace(/\./gi, "_")}_${secondTableName}`);
	}

	joinTableColumnName(tableName: any, propertyName: any, columnName: any) {
		//@ts-ignore
		return (0, _StringUtils.snakeCase)(`${tableName}_${columnName || propertyName}`);
	}

	classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any) {
		//@ts-ignore
		return (0, _StringUtils.snakeCase)(`${parentTableName}_${parentTableIdPropertyName}`);
	}

	eagerJoinRelationAlias(alias: any, propertyPath: string) {
		return `${alias}__${propertyPath.replace(".", "_")}`;
	}

}

type Connections = "app" | "nextauth"
const getConnection = async (name = "app") => {
	try {
		const conns = getConnectionManager().connections;
		conns.forEach((conn) => {
			console.log("connection name", conn.name)
		})
		connection = getConnectionManager().get(name);
	} catch (err) {
		connection = await createConnection({
			name: name,
			type: "mysql",
			host: process.env.DB_URL,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [new EntitySchema(UserSchema), EventEntity, BookingEntity],
			namingStrategy: new SnakeCaseNamingStrategy() as any
		});
		await connection.synchronize()
	}
	return connection
}
type Models = "User" | "Events" | "Booking"
const getModel = async (model: Models, connectionName: Connections = "app") => {
	const conn = await getConnection(connectionName);
	return conn.getRepository(model)
}

export const dbManager = { getConnection, getModel }