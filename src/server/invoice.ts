import { prisma } from "@/config/prisma"
import { InvoiceData } from "@/interface/invoice"

export async function findAllInvoice() {
	return await prisma.invoice.findMany({
		include: {
			items: true,
		},
	})
}

export async function findIdInvoice(id: string) {
	return await prisma.invoice.findUnique({
		where: {
			id,
		},
		include: {
			items: true,
		},
	})
}

export async function createInvoice(data: InvoiceData) {
	return await prisma.invoice.create({
		data: {
			customerName: data.customerName,
			customerEmail: data.customerEmail,
			date: new Date(data.date),
			invoiceNumber: data.invoiceNumber,
			accountName: data.accountName,
			accountNumber: data.accountNumber,
			items: {
				create: data.items.map((item) => ({
					desc: item.desc,
					price: item.price,
					qty: item.qty,
				})),
			},
		},
		include: {
			items: true,
		},
	})
}

export async function updateInvoice(data: InvoiceData, id: string) {
	return await prisma.$transaction(async (tx) => {
		await tx.invoiceItem.deleteMany({
			where: {
				invoiceId: id,
			},
		})

		return await prisma.invoice.update({
			where: { id },
			data: {
				customerName: data.customerName,
				customerEmail: data.customerEmail,
				date: new Date(data.date),
				invoiceNumber: data.invoiceNumber,
				accountName: data.accountName,
				accountNumber: data.accountNumber,
				items: {
					create: data.items.map((item) => ({
						desc: item.desc,
						price: item.price,
						qty: item.qty,
					})),
				},
			},
		})
	})
}

export async function deleteInvoice(id: string) {
	return await prisma.invoice.delete({
		where: {
			id,
		},
	})
}
