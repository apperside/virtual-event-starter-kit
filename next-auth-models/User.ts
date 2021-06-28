import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import Adapters from "next-auth/adapters"

// Extend the built-in models using class inheritance
export default class User extends (<any>Adapters.TypeORM.Models.User.model) {
	//@ts-ignore
	constructor(name, email, image, emailVerified) {
		super(name, email, image, emailVerified)
	}
}


export const UserSchema: EntitySchemaOptions<{ phoneNumber: string, stripeCustomerId: string }> = {
	target: User,
	name: "Users",
	columns: {
		...Adapters.TypeORM.Models.User.schema.columns,
		// Adds a phoneNumber to the User schema
		phoneNumber: {
			type: "varchar",
			nullable: true,
		},
		stripeCustomerId: {
			type: "varchar",
			nullable: true,
		},
	},
}