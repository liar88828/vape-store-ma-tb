"use client"
import React from "react"
import { Minus, Plus } from "lucide-react"
import { useInvoiceStore } from "../../store/invoice.store"
import { useProductStore } from "../../store/product.store"
import { ProductItem } from "../product/item"
import { useRouter } from "next/navigation"

const InvoiceForm: React.FC = () => {
	const { getProductItem } = useProductStore()
	const {
		formData,
		setField,
		handleItemChange,
		removeItem,
		calculateTotals,
		addInvoiceItem,
	} = useInvoiceStore()
	const route = useRouter()
	const { subtotal, tax, total } = calculateTotals()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const response = await addInvoiceItem(formData)
		if (response) {
			route.back()
		}
	}

	return (
		<div className="">
			<div className="card bg-base-200">
				<form onSubmit={handleSubmit} className=" card-body">
					<h1 className="card-title mb-2">Create Invoice</h1>

					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-bold">Customer Details</h3>
							<input
								type="text"
								placeholder="Customer Name"
								value={formData.customerName}
								onChange={(e) => setField("customerName", e.target.value)}
								className="w-full input input-bordered"
								required
							/>
							<input
								type="email"
								placeholder="Customer Email"
								value={formData.customerEmail}
								onChange={(e) => setField("customerEmail", e.target.value)}
								className="w-full input input-bordered"
								required
							/>
						</div>
						<div className="space-y-4">
							<h3 className="font-bold">Invoice Details</h3>
							<input
								type="date"
								value={formData.date}
								onChange={(e) => setField("date", e.target.value)}
								className="w-full input input-bordered"
								required
							/>
							<input
								type="text"
								placeholder="Invoice Number"
								value={formData.invoiceNumber}
								onChange={(e) => setField("invoiceNumber", e.target.value)}
								className="w-full input input-bordered"
								required
							/>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="font-bold">Items</h3>
						{formData.items.map((item, index) => (
							<div key={index} className="flex justify-between gap-4">
								<input
									type="text"
									placeholder="Description"
									value={item.name}
									onChange={(e) =>
										handleItemChange(index, "name", e.target.value)
									}
									className="input input-bordered w-full"
									required
								/>
								<input
									type="number"
									placeholder="Price"
									value={item.price}
									onChange={(e) =>
										handleItemChange(index, "price", Number(e.target.value))
									}
									className="input input-bordered w-full"
									required
								/>
								<input
									type="number"
									placeholder="Quantity"
									value={item.qty}
									onChange={(e) =>
										handleItemChange(index, "qty", Number(e.target.value))
									}
									className="input input-bordered w-full"
									required
								/>
								<button
									type="button"
									onClick={() => removeItem(index)}
									className="btn btn-error btn-square"
								>
									<Minus />
								</button>
							</div>
						))}

						<button
							type="button"
							className="btn btn-info"
							onClick={async () => {
								getProductItem("")
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-expect-error
								document.getElementById("modal_product").showModal()
							}}
						>
							<Plus />
						</button>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-bold">Payment Details</h3>
							<input
								type="text"
								placeholder="Account Name"
								value={formData.accountName}
								onChange={(e) => setField("accountName", e.target.value)}
								className="w-full input input-bordered"
								required
							/>
							<input
								type="text"
								placeholder="Account Number"
								value={formData.accountNumber}
								onChange={(e) => setField("accountNumber", e.target.value)}
								className="w-full input input-bordered"
								required
							/>
						</div>
						<div className="space-y-2 text-right">
							<p>Subtotal: RP {subtotal.toLocaleString()}</p>
							<p>Tax (10%): RP {tax.toLocaleString()}</p>
							<p className="font-bold">Total: RP {total.toLocaleString()}</p>
						</div>
					</div>
					<div className="card-actions mt-2">
						<button type="submit" className="btn btn-success w-full">
							Generate Invoice
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default InvoiceForm

export function DialogProduct() {
	const { productItems } = useProductStore()
	const { productItems: InvoiceProduct } = useInvoiceStore()

	return (
		<dialog id="modal_product" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<div className="space-y-5">
					{productItems
						.filter((item) => !InvoiceProduct.some((i) => i.id === item.id))
						.map((item) => (
							<ProductItem item={item} key={item.id} isSelect={true} />
						))}
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}
