import Models from "models"
import NextAuth from 'next-auth'
import Adapters from "next-auth/adapters"
import Providers from 'next-auth/providers'

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			//@ts-ignore
			forceLinkAccount: true
		}),
		Providers.Spotify({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			//@ts-ignore
			callbackUrl: "https://simonegaspari.com"
		}),
		Providers.Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		}),
		// Providers.Credentials({
		// 	// The name to display on the sign in form (e.g. 'Sign in with...')
		// 	name: 'Credentials',
		// 	// The credentials is used to generate a suitable form on the sign in page.
		// 	// You can specify whatever fields you are expecting to be submitted.
		// 	// e.g. domain, username, password, 2FA token, etc.
		// 	credentials: {
		// 		username: { label: "Username", type: "text", placeholder: "jsmith" },
		// 		password: { label: "Password", type: "password" }
		// 	},
		// 	async authorize(credentials, req) {
		// 		// You need to provide your own logic here that takes the credentials
		// 		// submitted and returns either a object representing a user or value
		// 		// that is false/null if the credentials are invalid.
		// 		// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
		// 		// You can also use the `req` object to obtain additional parameters
		// 		// (i.e., the request IP address) 
		// 		const res = await fetch("/your/endpoint", {
		// 			method: 'POST',
		// 			body: JSON.stringify(credentials),
		// 			headers: { "Content-Type": "application/json" }
		// 		})
		// 		const user = await res.json()

		// 		// If no error and we have user data, return it
		// 		if (res.ok && user) {
		// 			return user
		// 		}
		// 		// Return null if user data could not be retrieved
		// 		return null
		// 	}
		// })
		// ...add more providers here
	],
	adapter: Adapters.TypeORM.Adapter(
		// The first argument should be a database connection string or TypeORM config object
		"mysql://root:ciaociaociao@127.0.0.1:3306/seeting_local",
		// The second argument can be used to pass custom models and schemas
		// {
		// 	models: {
		// 		User: Models.User,
		// 	},
		// }
	),
	// A database is optional, but required to persist accounts in a database
	// database: {
	// 	"type": "mysql",
	// 	"host": "localhost",
	// 	"port": 3306,
	// 	"username": "root",
	// 	"password": "ciaociaociao",
	// 	"database": "seeting_local"
	// },
	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	secret: "nxytrn894353m4t83oio35649",// process.env.SECRET,

	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `jwt` is automatically set to `true` if no database is specified.
		jwt: true,

		// Seconds - How long until an idle session expires and is no longer valid.
		// maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},

	// JSON Web tokens are only used for sessions if the `jwt: true` session
	// option is set - or by default if no database is specified.
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		// secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
		// Set to true to use encryption (default: false)
		// encryption: true,

		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {
		// 	return Promise.resolve(token)
		// },
		// decode: async ({ secret, token, maxAge }) => {
		// 	return Promise.resolve(token)
		// },
	},

	// You can define custom pages to override the built-in ones. These will be regular Next.js pages
	// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	pages: {
		// signIn: '/auth/signin',  // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},

	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/require-await
		async signIn(user, account, profile) { return true },
		// async redirect(url, baseUrl) { return baseUrl },
		// async session(session, user) { return session },
		// async jwt(token, user, account, profile, isNewUser) { return token }
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// You can set the theme to 'light', 'dark' or use 'auto' to default to the
	// whatever prefers-color-scheme is set to in the browser. Default is 'auto'
	theme: 'light',

	// Enable debug messages in the console if you are having problems
	debug: false,
})