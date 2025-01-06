"use client"

import { Suspense } from "react"
import { PageLoading } from "@/app/components/Loading"
import { InvoiceList } from "@/app/components/product/item"
import { ProductDialogCreate } from "@/app/components/product/dialogCreate"
import { ProductDialogUpdate } from "@/app/components/product/dialogUpdate"

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
