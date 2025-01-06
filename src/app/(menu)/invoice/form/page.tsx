import InvoiceForm from "@/app/components/invoice/form"
import React, { Suspense } from "react"
import { PageLoading } from "@/app/components/Loading"
import { InvoiceProductSearchDialogShow } from "@/app/components/invoice/dialogInvoice"
import { InvoiceProductScanDialogShow } from "@/app/components/scan/dialogScan"

export default function page() {
	return (
		<Suspense fallback={<PageLoading />}>
			<InvoiceForm />
			<InvoiceProductSearchDialogShow />
			<InvoiceProductScanDialogShow />
		</Suspense>
	)
}
