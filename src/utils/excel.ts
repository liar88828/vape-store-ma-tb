import type { InvoiceInterface } from "../interface/invoice"
import { toDate, toDateFull } from "./toDate"
import * as XLSX from "xlsx"

export const exportToExcel = (invoices: InvoiceInterface[]) => {
	// Prepare the data for Excel
	const formattedData = invoices.map((invoice) => ({
		"Invoice Number": invoice.invoiceNumber,
		"Customer Name": invoice.customerName,
		"Customer Email": invoice.customerEmail,
		Date: toDate(invoice.date),
		Total: invoice.items.reduce(
			(total, item) => total + item.price * item.qty,
			0
		),
		Items: invoice.items.map((item) => item.name).join(", "),
		Prices: invoice.items.map((item) => item.price).join(", "),
		Quantities: invoice.items.map((item) => item.qty).join(", "),
	}))

	// Create a new worksheet
	const ws = XLSX.utils.json_to_sheet(formattedData)

	// Adjust column widths
	ws["!cols"] = [
		{ wch: 15 }, // "Invoice Number"
		{ wch: 20 }, // "Customer Name"
		{ wch: 25 }, // "Customer Email"
		{ wch: 15 }, // "Date"
		{ wch: 10 }, // "Total"
		{ wch: 40 }, // "Items"
		{ wch: 10 }, // "Prices"
		{ wch: 10 }, // "Quantities"
	]

	// Create a new workbook and append the worksheet
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Invoices")

	// Export the workbook to a file
	XLSX.writeFile(wb, `Invoices_${toDateFull(new Date())}.xlsx`)
}
