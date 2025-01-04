import { ProductDB } from "@prisma/client"

export interface ProductInterface {
	id?: string
	name: string
	price: number
	qty: number
}

export type ProductInterfaceServer = ProductDB
