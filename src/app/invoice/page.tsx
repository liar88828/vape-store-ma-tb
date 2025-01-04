import React from "react"
import { invoiceFindAll } from "../../network/invoice"
import InvoiceTable from "@/app/components/invoice/table"
import type { Context } from "../../interface/params"
import { getContext } from "../../utils/getContext"

export default async function page(context: Context) {
	const { search } = await getContext(context)

	const data = await invoiceFindAll(search ?? "")
	if (!data) {
		return <h1>Loading</h1>
	}
	if (data.data.length === 0) {
		return <h1>Data is Empty</h1>
	}
	return <InvoiceTable invoices={data.data} />
}
