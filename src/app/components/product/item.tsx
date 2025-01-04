"use client"
import React, { useCallback, useEffect } from "react"
import { toRupiah } from "../../../utils/toRupiah"
import { Pen, Plus, Search, Trash } from "lucide-react"
import { useProductStore } from "../../store/product.store"
import Loading from "../Loading"
import useDebounce from "../../../hook/useDebounce"
import type { ProductInterface } from "../../../interface/InvoiceItem"
import { useInvoiceStore } from "../../store/invoice.store"

export const InvoiceList: React.FC = () => {
	const { getProductItem, productItems, setProductItemPartial, productItem } =
		useProductStore()

	const debouncedSearchValue = useDebounce(productItem.name, 500)

	const fetchProductItems = useCallback(async () => {
		await getProductItem(debouncedSearchValue)
	}, [getProductItem, debouncedSearchValue])

	useEffect(() => {
		fetchProductItems()
	}, [fetchProductItems])

	if (!productItems) return <Loading />
	return (
		<div className="space-y-2 mt-5">
			<div className="">
				{/* <h2 className="card-title ">Invoice Items</h2> */}
				<div className="flex justify-between gap-5">
					<div className="join w-full">
						<input
							type="search"
							className="join-item input input-bordered w-full"
							placeholder="Search..."
							value={productItem.name}
							onChange={(e) => setProductItemPartial({ name: e.target.value })}
						/>
						<button className="join-item btn btn-neutral">
							<Search />
						</button>
					</div>
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
				</div>
			</div>
			<div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
				{productItems
					.filter((item) =>
						item.name.toLowerCase().includes(productItem.name.toLowerCase())
					)
					.map((item) => (
						<ProductItem item={item} key={item.id} isSelect={false} />
					))}
			</div>
		</div>
	)
}

export function ProductItem({
	item,
	isSelect,
}: {
	item: ProductInterface
	isSelect: boolean
}) {
	const { deleteProductItem, setProductItem } = useProductStore()
	const addItem = useInvoiceStore((state) => state.addItem)

	return (
		<div className="card bg-base-200 card-compact">
			<div className="card-body ">
				<div className="flex  justify-between">
					<div className="">
						<p>
							<strong>#{item.id}</strong>
						</p>
						<h1 className="card-title">{item.name}</h1>
						<p>
							<strong>Price:</strong> {toRupiah(item.price)}
						</p>
						<p>
							<strong>Quantity:</strong> {item.qty}
						</p>
					</div>
					<div className="flex gap-2 flex-col">
						{isSelect ? (
							<>
								<div className="">
									<button
										type="button"
										onClick={() => {
											addItem(item)
											const modal = document.getElementById(
												"modal_product"
											) as HTMLDialogElement
											modal.close()
										}}
										className="btn btn-info btn-square"
									>
										<Plus />
									</button>
								</div>
							</>
						) : (
							<>
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

								<button
									onClick={() => deleteProductItem(item.id)}
									className="btn-sm btn-square btn btn-error"
								>
									<Trash />
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
