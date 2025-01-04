"use client"

import { useProductStore } from "../../store/product.store"
import { ProductSchema } from "../../../validation/product"
import { z } from "zod"

export function InvoiceForm({
	method,
	id,
}: {
	method: "POST" | "PUT"
	id?: string
}) {
	const {
		addProductItem,
		setProductItemPartial,
		updateProductItem,
		productItem: formData,
	} = useProductStore()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setProductItemPartial({
			...formData,
			[name]: name === "price" || name === "qty" ? parseFloat(value) : value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault()
			const valid = ProductSchema.parse(formData)
			if (method === "POST" && !id) {
				addProductItem(valid)
			} else if (method === "PUT" && id) {
				updateProductItem(valid, id)
			}
			setProductItemPartial({ name: "", price: 0, qty: 0, id: "" })
		} catch (e) {
			if (e instanceof z.ZodError) {
				// console.log(e.issues)
			}
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1 className="card-title">Update Product</h1>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="desc"
					>
						Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						className="input input-bordered w-full"
						placeholder="Enter item Name"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="price"
					>
						Price
					</label>
					<input
						id="price"
						name="price"
						type="number"
						value={formData.price}
						onChange={handleChange}
						className="input input-bordered w-full"
						placeholder="Enter price"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="qty"
					>
						Quantity
					</label>
					<input
						id="qty"
						name="qty"
						type="number"
						value={formData.qty}
						onChange={handleChange}
						className="input input-bordered w-full"
						placeholder="Enter quantity"
						required
					/>
				</div>

				<div className="flex items-center justify-between">
					<button type="submit" className="btn btn-info">
						{method === "POST" ? "Create" : "Update"} Product
					</button>
				</div>
			</form>
		</div>
	)
}
