import InvoiceForm from "@/app/components/invoice/form"
import React, { Suspense } from "react"
import { PageLoading } from "../../components/Loading"
import { InvoiceProductSearchDialogShow } from "../../components/invoice/dialogInvoice"
import { InvoiceProductScanDialogShow } from "../../components/scan/dialogScan"

export default function page() {
	return (
		<Suspense fallback={<PageLoading />}>
			<InvoiceForm />
			<InvoiceProductSearchDialogShow />
			<InvoiceProductScanDialogShow />
		</Suspense>
	)
}
