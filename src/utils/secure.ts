import { object, string } from "zod"
import { prisma } from "@/config/prisma"
import { compare, hash } from "bcrypt-ts"
import { InvalidCredentials } from "../../auth.config"

export const saltAndHashPassword = async (password: string | unknown) => {
	if (typeof password !== "string") {
		throw new Error("password is required")
	}
	return hash(password, 10)
}

export const validatePassword = async (
	passwordClient: string,
	passwordDB: string
) => {
	return compare(passwordClient, passwordDB)
}

export const getUserFromDb = async (email: string, passwordClient: string) => {
	const user = await prisma.userDB.findFirst({
		where: { email },
	})

	if (!user) {
		throw new InvalidCredentials("User is Not Found")
		// throw new CredentialsSignin("User is Not Found")
	}
	const valid = await validatePassword(passwordClient, user.password)
	if (!valid) {
		throw new InvalidCredentials("Password is Not Valid")
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...rest } = user
	return rest
}

export const signInSchema = object({
	email: string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email"),
	password: string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
})
