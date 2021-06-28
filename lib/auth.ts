import { NextApiRequest } from "next";
import { EventCallback, JWTEventCallbacks, Session, SessionEventCallbacks, User } from "next-auth";
import { getSession } from "next-auth/client";
import { JWT } from "next-auth/jwt";
import { dbManager } from './database';
import { Error401 } from "./errors";
import { getServerSideStripe } from "./stripe";


// eslint-disable-next-line @typescript-eslint/require-await
const userCreated: EventCallback<User> = async (data: any) => {
	// const stripe = getServerSideStripe();
	console.log("created user is", data)

	// const stripeCustomer = await stripe.customers.create({ email: data.email ?? "" });

	// try {
	// 	const users = await dbManager.getRepository("users");


	// 	const updateResult = await users.update({ id: data.id }, { stripeCustomerId: stripeCustomer.id as any });
	// 	console.log("update done", updateResult)
	// } catch (err) {
	// 	console.error("error update", err)
	// }

	// console.log("cutomer is", stripeCustomer)

}

const checkSession = async (req: NextApiRequest) => {
	const session = await getSession({ req });
	if (!session || !session.user) {
		throw new Error401()
	}
	return { expires: session.expires!, user: session.user }
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

export const authHelper = {
	checkSession
}
