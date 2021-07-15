// ./utils/get-stripejs.ts
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>

export const getClientSideStripe = () => {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);//"pk_test_51IdwlJCgP78hQYYmKOkQb91h1gM6VNDgrXrYbcpDUGGt3F5JWSBRYhajmoJaQg1suf8DNPNVQRZzviMpkMKhJ1H4006PUY8hcC")
	}
	return stripePromise
}
