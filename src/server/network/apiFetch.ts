import { InvoiceInterface } from "@/interface/invoice"
import { ProductInterface } from "@/interface/InvoiceItem"

type QueryParams = Record<string, string | number | boolean | null | undefined>

export function toParams<T extends QueryParams>(params: T): string {
	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			searchParams.append(key, String(value))
		}
	})

	return searchParams.toString()
}

const apiFetch = async <T>(
	endpoint: string,
	params?: QueryParams,
	options?: RequestInit
): Promise<{ data: T }> => {
	const queryString = params ? `?${toParams(params)}` : ""
	const response = await fetch(`${endpoint}${queryString}`, options)

	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`)
	}

	return response.json()
}

const createCrudFunctions = <T>(resource: string) => ({
	findAll: (query?: QueryParams) => apiFetch<T[]>(`/${resource}`, query),
	findById: (id: string) => apiFetch<T>(`/${resource}/${id}`),
	create: (item: T) =>
		apiFetch<T>(`/${resource}`, undefined, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(item),
		}),
	update: (item: T, id: string) =>
		apiFetch<T>(`/${resource}/${id}`, undefined, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(item),
		}),
	delete: (id: string) =>
		apiFetch<T>(`/${resource}/${id}`, undefined, {
			method: "DELETE",
		}),
})

export const invoiceApi = createCrudFunctions<InvoiceInterface>("invoice")
export const productApi = createCrudFunctions<ProductInterface>("product")
