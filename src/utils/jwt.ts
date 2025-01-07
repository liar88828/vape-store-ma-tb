import { jwtVerify, SignJWT } from "jose";
import { User } from "next-auth";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: Omit<User, 'accessToken' | 'expire_date'>) {
    return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: [ 'HS256' ],
        })
        return payload as Omit<User, 'accessToken'>
    } catch (error) {
        console.log('Failed to verify session')
        throw error
    }
}