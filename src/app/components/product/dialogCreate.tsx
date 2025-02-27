"use client"

import { Plus } from "lucide-react"
import { InvoiceForm } from "./form"
import React from "react"
import { useProductStore } from "../../store/product.store"

export function ProductDialogCreate() {
	return (
		<dialog
			id="my_product_create"
			className="modal modal-bottom sm:modal-middle"
		>
			<div className="modal-box">
				<InvoiceForm method="POST" />
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}

export default function ProductDialogAction() {
	const { setProductItemPartial } = useProductStore()

	return (
		<button
			onClick={() => {
				setProductItemPartial({ name: "", price: 0, qty: 0, id: "" })
				const modal = document.getElementById(
					"my_product_create"
				) as HTMLDialogElement
				modal.showModal()
			}}
			className="btn-square btn btn-neutral "
		>
			<Plus />
		</button>
	)
}
