/* eslint-disable @next/next/no-img-element */
"use client"
import { InvoiceInterface } from "@/interface/invoice"
import React, { useRef } from "react"
import Form from "next/form"
import { useReactToPrint } from "react-to-print"
import { useInvoiceStore } from "../../store/invoice.store"
import { exportToExcel } from "../../../utils/excel"
import { Sheet } from "lucide-react"
import { toRupiah } from "../../../utils/toRupiah"
import { toDateFull } from "../../../utils/toDate"

export const InvoiceComponent: React.FC<{ data: InvoiceInterface }> = ({
	data,
}) => {
	const subtotal = data.items.reduce(
		(sum, item) => sum + item.price * item.qty,
		0
	)
	const tax = subtotal * 0.1
	const total = subtotal + tax

	return (
		<div className="max-w-3xl mx-auto p-8 bg-white text-black">
			<div className="flex justify-between items-start mb-8">
				<h1 className="text-4xl font-bold">INVOICE</h1>
				<div className="text-right flex items-center justify-end flex-col">
					<img src="/image/logo.png" alt="logo" className="size-20" />
					{/* <h2 className="text-sm font-bold mb-1">SALFORD & CO.</h2>
                    <p className="text-xs text-gray-600">Fashion Terlengkap</p> */}
				</div>
			</div>

			<div className="flex justify-between mb-8">
				<div>
					<h3 className="font-bold mb-2">KEPADA:</h3>
					<p>{data.customerName}</p>
					<p>{data.customerEmail}</p>
				</div>
				<div className="text-right">
					<p className="mb-2">
						TANGGAL:
						<br />
						{toDateFull(data.date)}
					</p>
					<p>
						NO INVOICE:
						<br />
						{data.invoiceNumber}
					</p>
				</div>
			</div>

			<table className="w-full mb-8">
				<thead>
					<tr className="border-b-2 border-gray-300">
						<th className="text-left py-2">KETERANGAN</th>
						<th className="text-left py-2">HARGA</th>
						<th className="text-center py-2">JML</th>
						<th className="text-right py-2">TOTAL</th>
					</tr>
				</thead>
				<tbody>
					{data.items.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="py-2">{item.name}</td>
							<td className="py-2">{toRupiah(item.price)}</td>
							<td className="text-center py-2">{item.qty}</td>
							<td className="text-right py-2">
								{toRupiah(item.price * item.qty)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-between mb-8">
				<div>
					<h3 className="font-bold mb-2">PEMBAYARAN:</h3>
					<p>Nama: {data.accountName}</p>
					<p>No Rek: {data.accountNumber}</p>
				</div>
				<div className="text-right">
					<p className="mb-1">SUB TOTAL: RP {subtotal.toLocaleString()}</p>
					<p className="mb-1">PAJAK: RP {tax.toLocaleString()}</p>
					<p className="font-bold">TOTAL: RP {total.toLocaleString()}</p>
				</div>
			</div>

			<div className="flex justify-between items-end">
				<p className="font-bold">
					TERIMAKASIH ATAS
					<br />
					PEMBELIAN ANDA
				</p>
				<div className="text-right">
					<img
						src="/image/signature.png"
						alt="Signature"
						className="mb-2 size-20"
					/>
					<p>Juliana Silva</p>
				</div>
			</div>
		</div>
	)
}

export default function InvoicePrint({
	children,
}: {
	children: React.ReactNode
}) {
	const contentRef = useRef<HTMLDivElement>(null)
	const reactToPrintFn = useReactToPrint({ contentRef })

	return (
		<div>
			<div ref={contentRef}>{children}</div>
			<div className="my-2">
				<button
					className="btn btn-info print:hidden"
					onClick={() => reactToPrintFn()}
				>
					Print
				</button>
			</div>
		</div>
	)
}

export function SearchInvoice({ invoices }: { invoices: InvoiceInterface[] }) {
	const { filter, setFilter } = useInvoiceStore()

	return (
		<div className="flex gap-2 items-center">
			<Form action={"/invoice"} className="join w-full sm:w-fit my-2">
				<input
					type="search"
					name="search"
					className="input input-bordered join-item w-full"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					placeholder="Search..."
				/>
				<button type="submit" className="join-item btn btn-neutral">
					Search
				</button>
			</Form>

			<button
				className="btn btn-success btn-square "
				onClick={() => exportToExcel(invoices)}
			>
				<Sheet />
			</button>
		</div>
	)
}
