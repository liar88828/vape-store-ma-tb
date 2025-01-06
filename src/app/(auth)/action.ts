"use server"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { prisma } from "@/config/prisma"
import { getUserFromDb, saltAndHashPassword, signInSchema, } from "@/utils/secure"
import { redirect } from "next/navigation"

export async function signInAction(
	prevData: undefined | { message?: string; success?: boolean },
	formData: FormData
) {
	try {
		const { email, password } = await signInSchema.parseAsync({
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		})

		// logic to verify if the user exists
		await getUserFromDb(email, password)

		await signIn("credentials", {
			email,
			password,
			redirect: false,
			redirectTo: "/invoice",
		})
		return { success: true }
	} catch (error) {
		if (error instanceof AuthError) {
			console.log(error.message)
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid Credentials page" }
				default:
					return { error: "Something went wrong page" }
			}
		}

		if (isRedirectError(error)) {
			throw error
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
		return { success: false, message: "An unexpected error occurred" }
	}
}

export async function signUpAction(
	prevData: undefined | { message?: string; success?: boolean },
	formData: FormData
) {
	try {
		const user = await signInSchema.parseAsync({
			email: formData.get("email") as string,
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
			data: { email: user.email, password: validPassword },
		})
		redirect("/login")
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		if (error instanceof Error) {
			return { success: false, message: error.message }
		}
		return { success: false, message: "An unexpected error occurred" }
	}
}
