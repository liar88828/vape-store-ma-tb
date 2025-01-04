import { create } from "zustand"
import type { ProductInterface } from "@/interface/InvoiceItem"
import {
	productCreate,
	productDelete,
	productFindAll,
	productUpdate,
} from "../../network/product"
import toast from "react-hot-toast"
import { toastHandler } from "../../utils/toast"

interface ProductStore {
	productItems: ProductInterface[]
	productItem: ProductInterface
	getProductItem: (search: string) => Promise<void>
	setProductItem: (item: ProductInterface) => void
	setProductItemPartial: (item: Partial<ProductInterface>) => void
	addProductItem: (item: ProductInterface) => Promise<void>
	deleteProductItem: (id?: string) => Promise<void>
	updateProductItem: (item: ProductInterface, id: string) => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
	productItems: [],
	productItem: {
		name: "",
		price: 0,
		qty: 0,
		id: "",
	},

	setProductItemPartial: async (item: Partial<ProductInterface>) => {
		set((state) => ({ productItem: { ...state.productItem, ...item } }))
	},
	setProductItem: async (item: ProductInterface) => {
		set({ productItem: item })
	},
	addProductItem: async (item: ProductInterface) => {
		await toastHandler({
			title: "Create Data Product",
			fun: async () => {
				const data = await productCreate(item)
				set((state) => ({ productItems: [...state.productItems, data.data] }))
			},
		})
	},
	getProductItem: async (search: string) => {
		const data = await productFindAll(search)
		// console.log(data)
		set({ productItems: data.data })
	},
	deleteProductItem: async (id?: string) => {
		if (!id) {
			toast.error("ID is required")
			return
		}
		await toastHandler({
			title: "Delete Data Product",
			fun: async () => {
				const data = await productDelete(id)
				set((state) => {
					const newData = state.productItems.filter(
						(product) => product.id !== data.data.id
					)
					return { productItems: newData }
				})
			},
		})
	},
	updateProductItem: async (item: ProductInterface, id: string) => {
		await toastHandler({
			title: "Update Data Product",
			fun: async () => {
				const data = await productUpdate(item, id)
				set((state) => {
					const newData = state.productItems.map((product) => {
						if (product.id === data.data.id) {
							return data.data
						}
						return product
					})
					return { productItems: newData }
				})
			},
		})
	},
}))
