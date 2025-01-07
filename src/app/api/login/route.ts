import { UserDB } from "@prisma/client";
import { encrypt } from "@/utils/jwt";
import { getUserFromDb } from "@/utils/secure";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ResponseLogin } from "@/interface/responseLogin";

import { signInSchema } from "@/validation/auth";

export async function GET() {
    return NextResponse.json({ msg: 'hello' })
}

export async function POST(request: Request) {
    try {

        const body: UserDB = await request.json();
        console.log(body, 'login api POST------------')

        const valid = signInSchema.parse(body)
        const user = await getUserFromDb(valid)
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
        console.log('api login Error -----')
        if (error instanceof ZodError) {

            return NextResponse.json({
                success: false,
                message: 'Validate Fail',
                error: error.flatten().fieldErrors
            }, {
                status: 401
            });
        }
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
