"use client"
import { Check, Plus } from "lucide-react"
import React, { useCallback, useEffect } from "react"
import { useProductStore } from "@/app/store/product.store"
import { ProductItem } from "@/app/components/product/item"
import { PageLoading } from "@/app/components/Loading"
import { useInvoiceStore } from "@/app/store/invoice.store"
import type { ProductInterface } from "@/interface/InvoiceItem"
import useDebounce from "@/hook/useDebounce";

export function InvoiceProductSearchDialogShow() {
	const {
		productItems,
		filter,
		setFilter,
		getProductAll,
		isLoading,
		setLoading,
	} = useProductStore()
	const { productItems: InvoiceProduct } = useInvoiceStore()

	const debouncedSearchValue = useDebounce(filter.name, 1000)

	const fetchProductItems = useCallback(async () => {
		setLoading(true)
		if (filter.name === debouncedSearchValue || filter.name === "") {
			await getProductAll(debouncedSearchValue)
		}
		// console.log("is debounce")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter.name, debouncedSearchValue, getProductAll])

	useEffect(() => {
		fetchProductItems()
	}, [fetchProductItems])

	return (
		<dialog id="modal_product" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<input
					type="search"
					className="input input-bordered w-full mb-2"
					value={filter.name}
					onChange={(e) => setFilter({ name: e.target.value })}
					placeholder="Search"
				/>
				<div className="space-y-2">
					{productItems
						.filter((item) => !InvoiceProduct.some((i) => i.id === item.id))
						.filter((item) =>
							item.name.toLowerCase().includes(filter.name.toLowerCase())
						)
						.map((item) => (
							<ProductItem item={item} key={item.id} isSelect={true} />
						))}
					{isLoading && <PageLoading />}
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}

export function InvoiceProductSearchDialogAction() {
	const { getProductAll } = useProductStore()
	return (
		<button
			type="button"
			className="btn btn-info btn-square"
			onClick={async () => {
				getProductAll("")
				const modal = document.getElementById(
					"modal_product"
				) as HTMLDialogElement
				modal.showModal()
			}}
		>
			<Plus />
		</button>
	)
}

export function InvoiceDialogActionClose({
	item,
	isKey,
}: {
	isKey: string
	item: ProductInterface
}) {
	const addItem = useInvoiceStore((state) => state.addItem)

	return (
		<button
			type="button"
			onClick={() => {
				addItem(item)
				const modal = document.getElementById(isKey) as HTMLDialogElement
				modal.close()

				const modalx = document.getElementById(
					"my_product_scan"
				) as HTMLDialogElement
				modalx.close()
			}}
			className="btn btn-info btn-square"
		>
			<Check />
		</button>
	)
}
