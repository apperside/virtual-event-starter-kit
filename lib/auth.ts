import { dbManager } from './database';
import { EventCallback, JWTEventCallbacks, Session, SessionEventCallbacks, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import getStripe, { getServerSideStripe } from "./stripe";
import { getConnectionManager } from "typeorm";


const userCreated: EventCallback<User> = async (data) => {
	const stripe = getServerSideStripe();
	console.log("created user is", data)

	const stripeCustomer = await stripe.customers.create({ email: data.email ?? "" });
	try {
		const users = await dbManager.getModel("User");


		const updateResult = await users.update({ id: data.id }, { stripeCustomerId: stripeCustomer.id });
		console.log("update done", updateResult)
	} catch (err) {
		console.error("error update", err)
	}

	console.log("cutomer is", stripeCustomer)

}

const onSession: EventCallback<{
	session: Session
	jwt: JWT
}> = async (data) => {
	// const stripe = getServerSideStripe()
	// console.log("data is", data, stripe)
}
export const authEvents: Partial<JWTEventCallbacks | SessionEventCallbacks> = {
	createUser: userCreated,
	session: onSession
}