// ./utils/get-stripejs.ts
import { Stripe } from '@stripe/stripe-js';
import { Stripe as ServerSideStripe } from "stripe";

let serverSideStripe: ServerSideStripe

export const getServerSideStripe = () => {
	if (!serverSideStripe) {
		//@ts-ignore
		serverSideStripe = new ServerSideStripe(process.env.STRIPE_PRIVATE_KEY!);//'sk_test_51IdwlJCgP78hQYYm0aq45VHUHCF2AoB19sHHOCCEsSXeilNoljEoh5HiKgRTuLwBl3korOVhtdmZD4oPhZFKRlAR00jMuS3kSB', { apiVersion: null })
	}
	return serverSideStripe;
}