import { Context } from "@/interface/params"
import { NextRequest, NextResponse } from "next/server"
import { ProductSchema } from "@/validation/product"
import { productDelete, productFindId, productUpdate, } from "@/server/service/product"
import { protectApi } from "@/utils/secure";

export async function GET(request: NextRequest, context: Context) {

	try {
        await protectApi(request)

		const id = (await context.params).id
		const data = await productFindId(id)
		if (!data) {
			throw new Error("Product Is EMpty")
		}
		// console.log(data)
		return NextResponse.json({ data })
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{
					data: error.message,
				},
				{ status: 404 }
			)
		}
		return NextResponse.json({ data: "Something Error" }, { status: 500 })
	}
}

export async function PUT(request: NextRequest, context: Context) {
	try {
        await protectApi(request)
		const id = (await context.params).id

		const json = await request.json()
		const valid = ProductSchema.parse(json)
		const data = await productUpdate(valid, id)

		return NextResponse.json({
			data: data,
		})
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
		const data = await productDelete(id)

		return NextResponse.json({
			data: data,
		})
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({
				data: error.message,
			})
		}
		return NextResponse.json({ data: "Somthing Error" })
	}
}
