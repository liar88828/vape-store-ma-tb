import { invoiceCreate, invoiceFindAll } from "@/server/invoice"
import { InvoiceSchema } from "@/validation/invoice"
import { NextRequest, NextResponse } from "next/server"
import { getParams } from "../../../utils/getContext"
import { z } from "zod"

export async function GET(request: NextRequest) {
	const search = getParams(request, "search") ?? ""
	try {
		const data = await invoiceFindAll(search)

		return NextResponse.json({ data })
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				data: error.message,
			})
		}
		return NextResponse.json({ data: "Something Error" })
	}
}

export async function POST(request: NextRequest) {
	try {
		const json = await request.json()
		const valid = InvoiceSchema.parse(json)
		// console.log(valid)
		const data = await invoiceCreate(valid)
		return NextResponse.json({ data })
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log(error.flatten().fieldErrors)
		}
		if (error instanceof Error) {
			return NextResponse.json(
				{
					data: error.message,
				},
				{ status: 401 }
			)
		}
		return NextResponse.json({ data: "Something Error" }, { status: 500 })
	}
}
