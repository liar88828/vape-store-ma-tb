import { NextRequest, NextResponse } from "next/server"
import { productCreate, productFindAll } from "@/server/product"
import { ProductSchema } from "@/validation/product"
import { getParams } from "@/utils/getContext"

export async function GET(request: NextRequest) {
	const search = getParams(request, "search")
	try {
		const data = await productFindAll(search)

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

export async function POST(request: NextRequest) {
	try {
		const json = await request.json()
		const valid = ProductSchema.parse(json)
		const data = await productCreate(valid)
		// console.log(data)
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
