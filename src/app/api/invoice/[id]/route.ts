import { Context } from "@/interface/params"
import { invoiceDelete, invoiceFindId, invoiceUpdate } from "@/server/service/invoice"
import { InvoiceSchema } from "@/validation/invoice"
import { NextRequest, NextResponse } from "next/server"
import { protectApi } from "@/utils/secure";

export async function GET(request: NextRequest, context: Context) {
	try {
        await protectApi(request)
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
        await protectApi(request)
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

export async function DELETE(request: NextRequest, context: Context) {
	try {
        await protectApi(request)
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
