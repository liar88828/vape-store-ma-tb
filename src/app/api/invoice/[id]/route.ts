import { Context } from "@/interface/params"
import { invoiceDelete, invoiceFindId, invoiceUpdate } from "@/server/invoice"
import { InvoiceSchema } from "@/validation/invoice"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_request: NextRequest, context: Context) {
	try {
		const id = (await context.params).id
		const data = await invoiceFindId(id)

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

export async function PUT(request: NextRequest, context: Context) {
	try {
		const id = (await context.params).id

		const json = await request.json()
		const valid = InvoiceSchema.parse(json)
		const data = await invoiceUpdate(valid, id)

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

export async function DELETE(_request: NextRequest, context: Context) {
	try {
		const id = (await context.params).id
		const data = await invoiceDelete(id)
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
