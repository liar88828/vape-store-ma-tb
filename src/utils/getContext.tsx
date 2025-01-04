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
