import { createInvoice, findAllInvoice } from "@/server/invoice";
import { InvoiceSchema } from "@/validation/invoice";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    try {
        const data = await findAllInvoice()

        return NextResponse.json({
            data: data
        })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                data: error.message
            })
        }
        return NextResponse.json({ data: 'Somthing Error' })
    }
}

export async function POST(request: NextRequest) {
    try {

        const json = await request.json()
        const valid = InvoiceSchema.parse(json)
        const data = await createInvoice(valid)

        return NextResponse.json({
            data: data
        })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                data: error.message
            })
        }
        return NextResponse.json({ data: 'Somthing Error' })
    }
}