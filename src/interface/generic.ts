import type { InvoiceInterface, InvoiceInterfaceServer } from "./invoice"

export type CompareType<T1, T2> = T1 extends T2
	? T2 extends T1
		? "true"
		: "false"
	: "false"

const isSame: CompareType<InvoiceInterface, InvoiceInterfaceServer> = "true"
console.log(isSame)
