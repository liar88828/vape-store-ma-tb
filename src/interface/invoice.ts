import type { InvoiceDB } from "@prisma/client"
import type { ProductInterfaceServer } from "./InvoiceItem"
import type { CompareType } from "./generic"

export interface InvoiceInterface {
	id?: string
	customerName: string
	customerEmail: string
	date: string
	customerPhone: string
	accountName: string
	accountNumber: string
	items: ProductInterfaceServer[]
}

export interface InvoiceInterfaceServer {
	id?: string
	customerName: string
	customerEmail: string
	date: string
	customerPhone: string
	accountName: string
	accountNumber: string
	items: ProductInterfaceServer[]
}

export const isSame: CompareType<InvoiceInterface, InvoiceInterfaceServer> =
	"true"

type OmitInvoiceDB = Omit<InvoiceDB, "createdAt" | "updatedAt" | "id">

export const isSamex: CompareType<OmitInvoiceDB, InvoiceInterfaceServer> =
	"false"

console.log(isSamex)
