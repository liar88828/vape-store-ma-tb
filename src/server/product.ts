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
	return await prisma.productDB.findUnique({ where: { id } })
}

export async function productCreate(data: ProductInterface) {
	if (!data.id) {
		delete data.id
	}
	return await prisma.productDB.create({ data })
}

export async function productUpdate(data: ProductInterface, id: string) {
	return await prisma.productDB.update({ where: { id }, data })
}

export async function productDelete(id: string) {
	return await prisma.productDB.delete({ where: { id } })
}
