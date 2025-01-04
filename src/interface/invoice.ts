import type { ProductInterfaceServer } from "./InvoiceItem"

export interface InvoiceInterface {
	id?: string
	customerName: string
	customerEmail: string
	date: string
	invoiceNumber: string
	items: ProductInterfaceServer[]
	accountName: string
	accountNumber: string
}

export interface InvoiceInterfaceServer {
	id?: string
	customerName: string
	customerEmail: string
	date: string
	invoiceNumber: string
	accountName: string
	accountNumber: string
	items: ProductInterfaceServer[]
}
