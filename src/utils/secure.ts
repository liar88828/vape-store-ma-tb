import { prisma } from "@/config/prisma"
import { compare, hash } from "bcrypt-ts"
import { InvalidCredentials } from "../../auth.config"
import { NextRequest } from "next/server";
import { decrypt } from "@/utils/jwt";
import { auth } from "@/auth";

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

export const getUserFromDb = async (data: { email: string, password: string }) => {

    const user = await prisma.userDB.findFirst({
        where: { email: data.email },
	})

	if (!user) {
		throw new InvalidCredentials("User is Not Found")
		// throw new CredentialsSignin("User is Not Found")
	}
    const valid = await validatePassword(data.password, user.password)
	if (!valid) {
		throw new InvalidCredentials("Password is Not Valid")
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...rest } = user

	return rest
}

export const findUser = async (email: string | null | undefined) => {
    if (!email) {
        throw new Error("Email is required")
    }
    const user = await prisma.userDB.findFirst({
        where: { email },
    })

    if (!user) {
        throw new Error("User is Not Found")
    }

    return user
}

export async function validToken(request: NextRequest) {
    const authHeader = request.headers.get('Authorization') ?? '';
    const myAccessToken = authHeader.split(' ').pop()
    return decrypt(myAccessToken)
}

export async function protectApi(request: NextRequest) {
    const session = await auth()
    // console.log("session", session)
    if (!session) {
        if (await validToken(request)) {
        }
    }
}