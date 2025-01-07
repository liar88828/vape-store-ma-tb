import { invoiceFindId } from "@/server/network/invoice"
import InvoicePrint, { InvoiceComponent, } from "@/app/components/invoice/invoice"
import { Context } from "@/interface/params"
import React from "react"

export default async function page(context: Context) {
	const id = (await context.params).id
	const data = await invoiceFindId(id)

	if (!data) {
		return <h1>Loading</h1>
	}
	// console.log(data)
	return (
		<InvoicePrint>
			<InvoiceComponent data={data.data} />
		</InvoicePrint>
	)
}
