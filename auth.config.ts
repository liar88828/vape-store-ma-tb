import { AuthError, CredentialsSignin, type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb, signInSchema } from "@/utils/secure"
import { z } from "zod"

export default {
	// pages: {
	// 	signIn: "/login",
	// },
	callbacks: {
        signIn({}) {
			// console.log({ user, account, profile, email, credentials })
			// email = credentials.email
			return true
		},
		jwt({ token, trigger, session }) {
			// console.log(session)
			if (trigger === "update") token.name = session.user.name
			// console.log(token)
			return token
		},
		async session({ session, token }) {
			if (token?.accessToken) session.accessToken = token.accessToken
			// console.log(session, "token--")
			return session
		},
	},
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
			authorize: async (credentials) => {
				try {
					let user = null

					const { email, password } = await signInSchema.parseAsync(credentials)

					// logic to verify if the user exists
					user = await getUserFromDb(email, password)

					// return user object with their profile data
					return user
				} catch (error) {
					if (error instanceof z.ZodError) {
						return error.flatten().fieldErrors
					}

					if (error instanceof AuthError) {
						console.log("is error ")
						switch (error.type) {
							case "CredentialsSignin":
								return { msg: error.message, status: "error" }

                            default:
								throw { msg: error.message, status: "error" }
						}
					}

					throw null
				}
			},
		}),
	],
} satisfies NextAuthConfig

export class InvalidCredentials extends AuthError {
	public readonly kind = "signIn"

	constructor(message: string) {
		super("Invalid credentials")
		this.message = message
		this.type = "CredentialsSignin"
	}
}

export class CustomError extends CredentialsSignin {
	constructor(code: string) {
		super()
		this.code = code
		this.message = code
		this.stack = undefined
	}
}
