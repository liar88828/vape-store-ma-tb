"use client"

import { Pen } from "lucide-react"
import type { ProductInterface } from "../../../interface/InvoiceItem"
import { useProductStore } from "../../store/product.store"
import { InvoiceForm } from "./form"

export function ProductDialogUpdate() {
	const { productItem } = useProductStore()
	return (
		<dialog
			id="my_product_update"
			className="modal modal-bottom sm:modal-middle"
		>
			<div className="modal-box">
				<InvoiceForm method="PUT" id={productItem.id} />
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}

export function ProductDialogUpdateAction({
	item,
}: {
	item: ProductInterface
}) {
	const { setProductItem } = useProductStore()

	return (
		<button
			onClick={() => {
				setProductItem(item)

				const isElement = document.getElementById(
					"my_product_update"
				) as HTMLDialogElement
				isElement.showModal()
			}}
			className="btn-sm btn-square btn btn-success"
		>
			<Pen />
		</button>
	)
}
