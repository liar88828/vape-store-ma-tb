import { decrypt, encrypt } from "@/utils/jwt";
import { findUser } from "@/utils/secure";
import { NextResponse } from "next/server";
import { ResponseLogin } from "@/interface/responseLogin";

export type RequestRevalidate = {
    tokenAccess: string
}

export async function POST(request: Request) {
    try {

        const json: RequestRevalidate = await request.json();
        // console.log(body, 'login api POST------------')

        const userRaw = await decrypt(json.tokenAccess);

        const user = await findUser(userRaw.email)
        if (user) {
            const accessToken = await encrypt(user);
            const result: ResponseLogin = {
                ...user,
                accessToken,
                expire_date: new Date(Date.now() + 1000 * 60 * 60)// 1h

            };
            return NextResponse.json(result)

        } else return NextResponse.json(null)
    } catch (error) {

        if (error instanceof Error) {
            return NextResponse.json({
                    error: error.message,
                    success: false
                },
                {
                    status: 401
                }
            );
        }
        return NextResponse.json({
                error: 'something went wrong',
                success: false
            }, {
                status: 500
            }
        );
    }
}
