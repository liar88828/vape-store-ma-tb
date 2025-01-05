import { create } from "zustand"
import type { ProductInterface } from "@/interface/InvoiceItem"
import type { InvoiceInterface } from "../../interface/invoice"
import { toastHandler } from "../../utils/toast"
import {
	invoiceCreate,
	invoiceDelete,
	invoiceFindAll,
	invoiceUpdate,
} from "../../network/invoice"
import toast from "react-hot-toast"

interface InvoiceStore {
	filter: {
		name: string
	}
	setFilter: (filter: string) => void
	formData: InvoiceInterface
	setField: (field: keyof InvoiceInterface, value: string | number) => void
	handleItemChange: (
		index: number,
		field: keyof ProductInterface,
		value: string | number
	) => void
	addItem: (item: ProductInterface) => void
	removeItem: (index: number) => void
	calculateTotals: () => { subtotal: number; tax: number; total: number }
	invoiceItems: InvoiceInterface[]
	productItems: ProductInterface[]
	getInvoiceAll: (search: string) => Promise<void>
	addInvoiceItem: (item: InvoiceInterface) => Promise<boolean>
	deleteInvoiceItem: (id?: string) => Promise<void>
	updateInvoiceItem: (item: InvoiceInterface, id: string) => Promise<void>
	tax: number
	setTax: (tax: number) => void
	isLoading: boolean
	setLoading: (loading: boolean) => void
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
	isLoading: false,
	setLoading: (isLoading) => set({ isLoading }),
	setTax: (tax: number) => set({ tax }),
	tax: 10,
	filter: {
		name: "",
	},
	invoiceItems: [],
	productItems: [],
	setFilter: (filter: string) => {
		set((state) => ({ filter: { ...state.filter, name: filter } }))
	},
	formData: {
		customerName: "",
		customerEmail: "",
		date: new Date().toISOString().split("T")[0],
		customerPhone: "",
		items: [{ name: "", price: 0, qty: 1, id: "" }],
		accountName: "",
		accountNumber: "",
	},
	setField: (field, value) =>
		set((state) => ({
			formData: { ...state.formData, [field]: value },
		})),
	handleItemChange: (index, field, value) => {
		set((state) => {
			const newItems = [...state.formData.items]
			newItems[index] = { ...newItems[index], [field]: value }
			return { formData: { ...state.formData, items: newItems } }
		})
	},
	addItem: (item) =>
		set((state) => ({
			productItems: [...state.productItems, item],

			formData: {
				...state.formData,
				items: [
					...state.formData.items,
					{ name: item.name, price: item.price, qty: 1, id: item.id ?? "" },
				],
			},
		})),
	removeItem: (index) =>
		set((state) => ({
			formData: {
				...state.formData,
				items: state.formData.items.filter((_, i) => i !== index),
			},
		})),
	calculateTotals: () => {
		const { items } = get().formData
		const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
		const tax = (subtotal * get().tax) / 100
		return { subtotal, tax, total: subtotal + tax }
	},
	addInvoiceItem: async (item) => {
		set({ isLoading: true })
		return toastHandler({
			title: "Create Data Invoice",
			fun: async () => {
				const data = await invoiceCreate(item)
				set((state) => ({
					invoiceItems: [...state.invoiceItems, data.data],
					isLoading: false,
				}))
			},
		})
	},
	getInvoiceAll: async (search: string) => {
		set({ isLoading: true })

		const data = await invoiceFindAll(search)
		// console.log(data)
		set({ invoiceItems: data.data, isLoading: false })
	},
	deleteInvoiceItem: async (id?: string) => {
		set({ isLoading: true })

		if (!id) {
			toast.error("ID is required")
			return
		}
		await toastHandler({
			title: "Delete Data Invoice",
			fun: async () => {
				const data = await invoiceDelete(id)
				set((state) => {
					const newData = state.invoiceItems.filter(
						(invoice) => invoice.id !== data.data.id
					)
					return { invoiceItems: newData, isLoading: true }
				})
			},
		})
	},
	updateInvoiceItem: async (item: InvoiceInterface, id: string) => {
		set({ isLoading: true })

		await toastHandler({
			title: "Update Data Invoice",
			fun: async () => {
				const data = await invoiceUpdate(item, id)
				set((state) => {
					const newData = state.invoiceItems.map((invoice) => {
						if (invoice.id === data.data.id) {
							return data.data
						}
						return invoice
					})
					return { invoiceItems: newData, isLoading: true }
				})
			},
		})
	},
}))
