import { InvoiceInterface } from "@/interface/invoice"

export const invoiceFindAll = async (
	search: Partial<{
		name: string
		dateStart: string
		dateEnd: string
	}>
) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/api/invoice?name=${search.name}&dateStart=${search.dateStart}&dateEnd=${search.dateEnd}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)

	if (!response.ok) {
		console.log(await response.text())
	}
	const data = await response.json()
	return data as { data: InvoiceInterface[] }
}

export const invoiceFindId = async (id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/api/invoice/${id}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	const data = await response.json()
	return data as { data: InvoiceInterface }
}

export const invoiceCreate = async (invoice: InvoiceInterface) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/api/invoice`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(invoice),
		}
	)
	if (!response.ok) {
		const error = await response.json()
		console.log(error)
		throw new Error(error)
	}
	const data = await response.json()
	return data as { data: InvoiceInterface }
}

export const invoiceUpdate = async (invoice: InvoiceInterface, id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/api/invoice/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(invoice),
		}
	)
	const data = await response.json()
	return data as { data: InvoiceInterface }
}

export const invoiceDelete = async (id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL_API}/api/invoice/${id}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
	const data = await response.json()
	return data as { data: InvoiceInterface }
}
