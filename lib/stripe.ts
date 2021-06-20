// ./utils/get-stripejs.ts
import { Stripe, loadStripe } from '@stripe/stripe-js'

import { Stripe as ServerSideStripe } from "stripe";
let stripePromise: Promise<Stripe | null>
let serverSideStripe: ServerSideStripe
const getStripe = () => {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	if (!stripePromise) {
		stripePromise = loadStripe("pk_test_51IdwlJCgP78hQYYmKOkQb91h1gM6VNDgrXrYbcpDUGGt3F5JWSBRYhajmoJaQg1suf8DNPNVQRZzviMpkMKhJ1H4006PUY8hcC")
	}
	return stripePromise
}

export const getServerSideStripe = () => {
	if (!serverSideStripe) {
		//@ts-ignore
		serverSideStripe = new ServerSideStripe('sk_test_51IdwlJCgP78hQYYm0aq45VHUHCF2AoB19sHHOCCEsSXeilNoljEoh5HiKgRTuLwBl3korOVhtdmZD4oPhZFKRlAR00jMuS3kSB', { apiVersion: null })
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	// const stripe = stripeLib('sk_test_51IdwlJCgP78hQYYm0aq45VHUHCF2AoB19sHHOCCEsSXeilNoljEoh5HiKgRTuLwBl3korOVhtdmZD4oPhZFKRlAR00jMuS3kSB');
	return serverSideStripe;
}
export default getStripe