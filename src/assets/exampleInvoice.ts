import { InvoiceInterface } from "@/interface/invoice"

const sampleInvoiceData: InvoiceInterface = {
	customerName: "Ketut Susilo",
	customerEmail: "hello@reallygreatsite.com",
	date: "2024-01-03",
	invoiceNumber: "INV/2024/001",
	items: [
		{ id: "", name: "KAOS", price: 100000, qty: 1 },
		{ id: "", name: "JAKET", price: 200000, qty: 1 },
		{ id: "", name: "KAOS POLO", price: 120000, qty: 1 },
		{ id: "", name: "SEPATU", price: 230000, qty: 1 },
		{ id: "", name: "SEPATU", price: 100000, qty: 1 },
	],
	accountName: "Salford & Co.",
	accountNumber: "+123-456-7890",
}

export default sampleInvoiceData
