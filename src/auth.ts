import NextAuth, { AuthError } from "next-auth"
import { RequestRevalidate } from "@/app/api/revalidate/route";
import { ResponseLogin } from "@/interface/responseLogin";
import Credentials from "@auth/core/providers/credentials";
import { signInSchema } from "@/validation/auth";
import { getUserFromDb } from "@/utils/secure";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({

    // pages: {
    // 	signIn: "/login",
    // },
    session: { strategy: "jwt" },
    callbacks: {

        // async authorized(req: NextRequest, res: Response) {
        //     return true
        // },
        async jwt({ token, trigger, session, user, account }) {
            // console.log(user)
            // console.log(account,'account');
            if (account) {

                // First-time login, save the `access_token`, its expiry and the `refresh_token`
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                token.idUser = user.id
                token.access_token = user.accessToken
                token.expires_at = new Date(user.expire_date).getTime()
                token.role = user.role
                // token.refresh_token = account.refresh_token
                // console.log(token)
                return token
            } else if (Date.now() < token.expires_at * 1000) {
                // Subsequent logins, but the `access_token` is still valid
                return token
            } else {
                try {

                    if (!token.access_token) {
                        throw new TypeError('Missing access_token')
                    }
                    const send: RequestRevalidate = {
                        tokenAccess: token.access_token,
                    }
                    const res = await fetch(`${ process.env.NEXT_PUBLIC_URL_API }/api/revalidate`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(send),
                        });
                    if (!res.ok) {
                        console.log('action api login ')
                        console.log(await res.text())
                    }

                    const data: ResponseLogin = await res.json()
                    if (user) {
                        token.idUser = data.id
                        token.access_token = data.accessToken
                        token.expires_at = new Date(data.expire_date).getTime()
                        token.role = user.role
                    }
                    if (trigger === "update") {
                        token.name = session.user.name
                    }
                    // console.log(token,'jwt callback')
                    return token
                } catch (e) {
                    console.error(e)
                    token.error = "RefreshTokenError"
                    return token
                }
            }
        },
        async session({ session, token, }) {
            // console.log(session, 'session session callback')
            // console.log(token,'session token callback')
            // const isValidToken = getIsTokenValid(token)
            // if (!isValidToken) return { user: null }

            if (token) {
                session.accessToken = token.access_token
                session.user.role = token.role
                session.user.id = token.idUser
            }
            // console.log(session, "token--")
            session.error = token.error
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
                    // console.log(credentials)

                    if (!credentials) {
                        throw new Error('Error creating login')
                    } else {

                        const valid = await signInSchema.parseAsync(credentials)
                        // logic to verify if the user exists
                        await getUserFromDb(valid)
                        // return user object with their profile data
                        // console.log(valid,'valid auth')
                        // console.log(user,'user auth')
                        // console.log(credentials,'credentials auth')
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { password, ...rest } = credentials
                        return rest
                    }

                } catch (error: unknown) {
                    if (error instanceof z.ZodError) {
                        throw error.flatten().fieldErrors
                    }

                    if (error instanceof AuthError) {
                        switch (error.type) {
                            case "CredentialsSignin":
                                throw { msg: error.message, status: "error" }

                            default:
                                throw { msg: error.message, status: "error" }
                        }
                    }

                    throw null
                }
            }
        }),
    ],

})
