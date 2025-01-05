"use client"
import { InvoiceList } from "../components/product/item"
import { Suspense } from "react"
import { PageLoading } from "../components/Loading"
import { ProductDialogUpdate } from "../components/product/dialogUpdate"
import { ProductDialogCreate } from "../components/product/dialogCreate"

export default function page() {
	return (
		<Suspense fallback={<PageLoading />}>
			<Suspense fallback={<PageLoading />}>
				<InvoiceList />
			</Suspense>
			<ProductDialogCreate />
			<ProductDialogUpdate />
		</Suspense>
	)
}
