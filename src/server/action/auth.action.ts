"use server"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { prisma } from "@/config/prisma"
import { saltAndHashPassword, } from "@/utils/secure"
import { redirect } from "next/navigation"
import { ZodError } from "zod";
import { signIn } from "@/auth";
import { ResponseLogin } from "@/interface/responseLogin";

import { signInSchema } from "@/validation/auth";

export async function signInAction(
    prevData: undefined | {
        message?: string; success?: boolean,

    },
    formData: FormData
):
    Promise<{
        message: string;
        success: boolean,
        prev: {
            email: string,
        }
        error?: {
            email?: string[],
            password?: string[],
        },
    }> {
    const email = formData.get("email") as string;
    const passwordRaw = formData.get("password") as string;
    try {
        const valid = signInSchema.parse({
            email,
            password: passwordRaw
        })

        // logic to verify if the user exists
        // await getUserFromDb(valid.email, valid.password)
        // console.log(valid, 'validate form')

        const res = await fetch(`${ process.env.NEXT_PUBLIC_URL_API }/api/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(valid),
            });
        if (!res.ok) {
            console.log('action api login ')
            console.log(await res.text())
        }
        const data: ResponseLogin = await res.json()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data.password = passwordRaw
        // formData.set("email", data.email)
        // formData.set("accessToken", data.accessToken)
        // formData.set("role", data.role)
        // formData.set("id", data.id)
        await signIn("credentials", data)

        redirect("/")

    } catch (error) {

        if (isRedirectError(error)) {
            throw error
        }

        if (error instanceof ZodError) {
            return {
                error: {
                    email: error.flatten().fieldErrors['email'],
                    password: error.flatten().fieldErrors['password']

                },
                prev: {
                    email,
                },
                success: false,
                message: "Invalid Credentials page"
            }
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        prev: {
                            email,
                        },
                        success: false,
                        message: "Invalid Credentials page"
                    }
                default:
                    return {
                        prev: {
                            email,
                        },
                        success: false,
                        message: "Something went wrong page"
                    }
            }
        }

        // if (e instanceof CredentialsSignin) {
        // }
        // if (isRedirectError(e)) {
        // 	throw e
        // }

        // if (e instanceof InvalidCredentials) {
        // 	console.log(e)
        // }
        // return undefined
        return {
            success: false,
            message: "An unexpected error occurred",
            prev: {
                email
            }
        }
    }
}

export async function signUpAction(
    prevData: undefined | { message?: string; success?: boolean },
    formData: FormData
): Promise<{
    message: string;
    success: boolean,
    prev: {
        email: string,
    }
    error?: {
        email?: string[],
        password?: string[],
    },
}> {
    const email = formData.get("email") as string;
    try {
        const user = await signInSchema.parseAsync({
            email,
            password: formData.get("password") as string,
        })

        const validPassword = await saltAndHashPassword(user.password)

        const userDB = await prisma.userDB.findFirst({
            where: { email: user.email },
        })

        if (userDB) {
            throw new Error("User already exists")
        }

        await prisma.userDB.create({
            data: {
                email: user.email,
                password: validPassword,
                role: ""
            },
        })

        redirect("/login")

    } catch (error) {

        if (isRedirectError(error)) {
            throw error
        }

        if (error instanceof ZodError) {
            return {
                error: {
                    email: error.flatten().fieldErrors['email'],
                    password: error.flatten().fieldErrors['password']

                },
                prev: {
                    email,
                },
                success: false,
                message: "Invalid Credentials page"
            }
        }

        if (error instanceof Error) {
            return {
                success: false,
                message: "An unexpected error occurred",
                prev: {
                    email
                }
            }
        }
        return {
            success: false,
            message: "An unexpected error occurred",
            prev: {
                email
            }
        }
    }
}
