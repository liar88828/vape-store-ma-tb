// eslint-disable-next-line @typescript-eslint/no-unused-vars
// noinspection ES6UnusedImports
import NextAuth, { type DefaultSession } from "next-auth"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// noinspection ES6UnusedImports
import { JWT } from "next-auth/jwt"

type userSeason = {
	email: string
	id: string
} | null

declare module "next-auth" {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */

    interface User {
        id: string
        email: string
        role: "ADMIN" | "USER" | string
        accessToken: string
        expire_date: Date


	}

	/**
	 * The shape of the account object returned in the OAuth providers' `account` callback,
	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
	 */
	interface Account {
        access_token: string
	}

	/**
	 * Returned by `useSession`, `auth`, contains information about the active session.
	 */
    interface Session {
        role: "ADMIN" | "USER"
        accessToken: string
        error?: "RefreshTokenError"
	}
}


declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string
        access_token: string
        expires_at: number
        refresh_token?: string
        error?: "RefreshTokenError"
        role: "ADMIN" | "USER" | string
        idUser: string
	}
}
