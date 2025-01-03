export interface InvoiceItem {
	desc: string
	price: number
	qty: number
}

export interface InvoiceData {
	id?: string
	customerName: string
	customerEmail: string
	date: string
	invoiceNumber: string
	items: InvoiceItem[]
	accountName: string
	accountNumber: string
}
