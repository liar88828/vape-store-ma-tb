import { prisma } from "@/config/prisma"
import type { ProductInterface } from "../interface/InvoiceItem"

export async function productFindAll(search: string) {
	return await prisma.productDB.findMany({
		where: {
			name: {
				contains: search,
			},
		},
	})
}

export async function productFindId(id: string) {
	return await prisma.productDB.findUnique({
		where: { id },
	})
}

export async function productCreate(data: ProductInterface) {
	return await prisma.productDB.create({
		data: {
			name: data.name,
			price: data.price,
			qty: data.qty,
		},
	})
}

export async function productUpdate(data: ProductInterface, id: string) {
	return await prisma.productDB.update({
		where: { id },
		data: {
			name: data.name,
			price: data.price,
			qty: data.qty,
		},
	})
}

export async function productDelete(id: string) {
	return await prisma.productDB.delete({
		where: {
			id,
		},
	})
}
