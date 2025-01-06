import { invoiceCreate, invoiceFindAll } from "@/server/invoice"
import { InvoiceSchema } from "@/validation/invoice"
import { NextRequest, NextResponse } from "next/server"
import { getParams, getParamsDate } from "@/utils/getContext"
import { z } from "zod"

export async function GET(request: NextRequest) {
	const name = getParams(request, "name") ?? ""
	const dateStart = getParamsDate(request, "dateStart")
	const dateEnd = getParamsDate(request, "dateEnd")
	try {
		const data = await invoiceFindAll({
			name,
			dateEnd, // is Date
			dateStart, // is Date
		})

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
