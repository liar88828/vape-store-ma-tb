import type { ProductInterface } from "../interface/InvoiceItem"

export const productFindAll = async (search: string) => {
	const response = await fetch(
		`http://localhost:3000/api/product?search=${search}`
	)
	const data = await response.json()
	return data as { data: ProductInterface[] }
}

export const productFindId = async (id: string) => {
	const response = await fetch(`http://localhost:3000/api/product/${id}`)
	const data = await response.json()
	return data as { data: ProductInterface }
}

export const productCreate = async (product: ProductInterface) => {
	const response = await fetch(`http://localhost:3000/api/product`, {
		method: "POST",
		body: JSON.stringify(product),
	})
	const data = await response.json()
	return data as { data: ProductInterface }
}

export const productUpdate = async (product: ProductInterface, id: string) => {
	const response = await fetch(`http://localhost:3000/api/product/${id}`, {
		method: "PUT",
		body: JSON.stringify(product),
	})
	const data = await response.json()
	return data as { data: ProductInterface }
}

export const productDelete = async (id: string) => {
	const response = await fetch(`http://localhost:3000/api/product/${id}`, {
		method: "DELETE",
	})
	const data = await response.json()
	return data as { data: ProductInterface }
}
