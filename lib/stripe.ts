// ./utils/get-stripejs.ts
import { Stripe, loadStripe } from '@stripe/stripe-js'

import { Stripe as ServerSideStripe } from "stripe";
let stripePromise: Promise<Stripe | null>
let serverSideStripe: ServerSideStripe

export const getClientSideStripe = () => {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);//"pk_test_51IdwlJCgP78hQYYmKOkQb91h1gM6VNDgrXrYbcpDUGGt3F5JWSBRYhajmoJaQg1suf8DNPNVQRZzviMpkMKhJ1H4006PUY8hcC")
	}
	return stripePromise
}

export const getServerSideStripe = () => {
	if (!serverSideStripe) {
		//@ts-ignore
		serverSideStripe = new ServerSideStripe(process.env.STRIPE_PRIVATE_KEY!);//'sk_test_51IdwlJCgP78hQYYm0aq45VHUHCF2AoB19sHHOCCEsSXeilNoljEoh5HiKgRTuLwBl3korOVhtdmZD4oPhZFKRlAR00jMuS3kSB', { apiVersion: null })
	}
	return serverSideStripe;
}