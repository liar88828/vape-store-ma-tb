import type { NextRequest } from "next/server"
import type { Context } from "../interface/params"

export async function getContext(
	context: Context
): Promise<Context["searchParams"]> {
	return context.searchParams
}

export function getParams(request: NextRequest, name: string) {
	return request.nextUrl.searchParams.get(name) ?? ""
}

export function getParamsDate(
	request: NextRequest,
	paramName: string
): Date | undefined {
	const paramValue = getParams(request, paramName) ?? ""

	if (!paramValue) {
		return undefined // Return null if the parameter is not provided
	}

	const parsedDate = new Date(paramValue)

	if (isNaN(parsedDate.getTime())) {
		throw new Error(
			`Invalid date format for parameter "${paramName}": ${paramValue}`
		)
	}

	return parsedDate
}
