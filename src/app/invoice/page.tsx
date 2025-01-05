import React from "react"
import InvoiceTable from "@/app/components/invoice/table"
import { SearchInvoice } from "../components/invoice/invoice"

export default function page() {
	return (
		<SearchInvoice>
			<InvoiceTable />
		</SearchInvoice>
	)
}
