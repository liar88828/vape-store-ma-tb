import { create } from "zustand"
import type { ProductInterface } from "@/interface/InvoiceItem"
import {
	productCreate,
	productDelete,
	productFindAll,
	productFindId,
	productUpdate,
} from "../../network/product"
import toast from "react-hot-toast"
import { toastHandler } from "../../utils/toast"

interface ProductStore {
	productItems: ProductInterface[]
	productItem: ProductInterface
	productScan: ProductInterface | null
	getProductScan: (search: string) => Promise<void>

	getProductAll: (search: string) => Promise<void>
	getProductById: (search: string) => Promise<void>

	setProductItem: (item: ProductInterface) => void
	setProductItemPartial: (item: Partial<ProductInterface>) => void
	addProductItem: (item: ProductInterface) => Promise<void>
	deleteProductItem: (id?: string) => Promise<void>
	updateProductItem: (item: ProductInterface, id: string) => Promise<void>
	filter: {
		name: string
		id: string
	}
	setFilter: (filter: Partial<{ name: string; id: string }>) => void
	isLoading: boolean
	setLoading: (isLoading: boolean) => void
	isCreate: boolean
	setCreate: (isCreate: boolean) => void
}

export const useProductStore = create<ProductStore>((set) => ({
	setCreate: (isLoading) => set({ isLoading }),
	isCreate: false,
	setLoading: (isLoading) => set({ isLoading }),
	isLoading: false,
	productScan: null,
	getProductScan: async (search: string) => {
		set({ isLoading: true })

		try {
			const data = await productFindId(search)
			set({ productScan: data.data })
		} catch (e: unknown) {
			if (e instanceof Error) {
				// console.log(e.message)
				set({ productScan: null })
			}
		} finally {
			set({ isLoading: false })
		}
	},
	filter: {
		id: "",
		name: "",
	},
	setFilter: (filter) => {
		set((state) => ({ filter: { ...state.filter, ...filter } }))
	},
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
	getProductAll: async (search: string) => {
		const data = await productFindAll(search)
		set({ productItems: data.data, isLoading: false })
	},
	getProductById: async (search: string) => {
		const data = await productFindId(search)
		set({ productItem: data.data })
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
