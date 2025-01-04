import { InvoiceInterface } from "@/interface/invoice"

export const invoiceFindAll = async (search: string) => {
	const response = await fetch(
		`http://localhost:3000/api/invoice?search=${search}`
	)
	const data = await response.json()
	return data as { data: InvoiceInterface[] }
}

export const invoiceFindId = async (id: string) => {
	const response = await fetch(`http://localhost:3000/api/invoice/${id}`)
	const data = await response.json()
	return data as { data: InvoiceInterface }
}

export const invoiceCreate = async (invoice: InvoiceInterface) => {
	const response = await fetch(`http://localhost:3000/api/invoice`, {
		method: "POST",
		body: JSON.stringify(invoice),
	})
	const data = await response.json()
	return data as { data: InvoiceInterface }
}

export const invoiceUpdate = async (invoice: InvoiceInterface, id: string) => {
	const response = await fetch(`http://localhost:3000/api/invoice/${id}`, {
		method: "PUT",
		body: JSON.stringify(invoice),
	})
	const data = await response.json()
	return data as { data: InvoiceInterface }
}

export const invoiceDelete = async (id: string) => {
	const response = await fetch(`http://localhost:3000/api/invoice/${id}`, {
		method: "DELETE",
	})
	const data = await response.json()
	return data as { data: InvoiceInterface }
}
