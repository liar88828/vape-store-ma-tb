import { prisma } from "@/config/prisma"
import type { InvoiceSchemaType } from "@/validation/invoice"

export async function invoiceFindAll(filter: {
	dateStart?: Date
	dateEnd?: Date
	name: string
}) {
	return await prisma.invoiceDB.findMany({
		where: {
			customerName: {
				contains: filter.name,
			},
			date: {
				...(filter.dateStart && { gte: filter.dateStart }),
				...(filter.dateEnd && { lte: filter.dateEnd }),
			},
		},
		include: { items: true },
		take: filter.dateStart || filter.dateEnd || filter.name ? undefined : 1000,
	})
}

export async function invoiceFindId(id: string) {
	return await prisma.invoiceDB.findUnique({
		where: { id },
		include: { items: true },
	})
}

export async function invoiceCreate(data: InvoiceSchemaType) {
	prisma.$transaction(async (tx) => {
		await tx.invoiceDB.create({
			data: {
				customerName: data.customerName,
				customerEmail: data.customerEmail,
				date: new Date(data.date),
				customerPhone: data.customerPhone,
				accountName: data.accountName,
				accountNumber: data.accountNumber,
				items: {
					create: data.items.map((item) => ({
						name: item.name,
						price: item.price,
						qty: item.qty,
					})),
				},
			},
		})

		data.items.map(async (item) => {
			await tx.productDB.update({
				where: { id: item.id },
				data: { qty: { decrement: item.qty } },
			})
		})
	})
}

export async function invoiceUpdate(data: InvoiceSchemaType, id: string) {
	return await prisma.$transaction(async (tx) => {
		data.items.map(async (item) => {
			await tx.productDB.update({
				where: { id: item.id },
				data: { qty: { increment: item.qty } },
			})
		})

		data.items.map(async (item) => {
			await tx.invoiceProductDB.delete({
				where: { id: item.id },
			})
		})

		await tx.invoiceDB.update({
			where: { id },
			data: {
				customerName: data.customerName,
				customerEmail: data.customerEmail,
				date: new Date(data.date),
				customerPhone: data.customerPhone,
				accountName: data.accountName,
				accountNumber: data.accountNumber,
				items: {
					create: data.items.map((item) => ({
						name: item.name,
						price: item.price,
						qty: item.qty,
					})),
				},
			},
		})

		data.items.map(async (item) => {
			await tx.productDB.update({
				where: { id: item.id },
				data: { qty: { decrement: item.qty } },
			})
		})
	})
}

export async function invoiceDelete(id: string) {
	return await prisma.$transaction(async (tx) => {
		const data = await tx.invoiceDB.findUnique({
			where: { id },
			include: { items: true },
		})

		if (!data) {
			throw new Error("Invoice not found")
		}

		data.items.map(async (item) => {
			await tx.productDB.update({
				where: { id: item.id },
				data: { qty: { increment: item.qty } },
			})
		})

		data.items.map(async (item) => {
			await tx.invoiceProductDB.delete({
				where: { id: item.id },
			})
		})

		await tx.invoiceDB.delete({
			where: { id },
		})
	})
}
