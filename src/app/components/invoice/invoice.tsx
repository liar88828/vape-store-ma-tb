/* eslint-disable @next/next/no-img-element */
"use client"
import { InvoiceInterface } from "@/interface/invoice"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Form from "next/form"
import { useReactToPrint } from "react-to-print"
import { useInvoiceStore } from "../../store/invoice.store"
import { exportToExcel } from "../../../utils/excel"
import { Plus, Search, Sheet } from "lucide-react"
import { toRupiah } from "../../../utils/toRupiah"
import { toDateFull } from "../../../utils/toDate"
import Link from "next/link"
import QRCode from "react-qr-code"
import useDebounce from "../../../hook/useDebounce"

export const InvoiceComponent: React.FC<{ data: InvoiceInterface }> = ({
	data,
}) => {
	const [fullPath, setFullPath] = useState<string>()
	useEffect(() => {
		if (window) {
			const currentURL = new URL(window.location.href)
			setFullPath(currentURL.href)
			// console.log(currentURL)
			// // host (domain)
			// const host = currentURL.host
			// console.log("Host:", host)

			// // path (path dari URL)
			// const path = currentURL.pathname
			// console.log("Path:", path)

			// // query (parameter dari URL)
			// const query = currentURL.search
			// console.log("Query:", query)
		}
	}, [])

	const subtotal = data.items.reduce(
		(sum, item) => sum + item.price * item.qty,
		0
	)
	const tax = subtotal * 0.1
	const total = subtotal + tax

	return (
		<div className="max-w-3xl mx-auto p-8 bg-white text-black">
			<div className="flex justify-between items-start mb-8">
				<img src="/image/logo.png" alt="logo" className="size-20" />

				{/* <h1 className="text-4xl font-bold">INVOICE</h1> */}
				<div className="text-right flex items-center justify-end flex-col">
					{/* <img src="/image/logo.png" alt="logo" className="size-20" /> */}
					{/* <h2 className="text-sm font-bold mb-1">SALFORD & CO.</h2>
                    <p className="text-xs text-gray-600">Fashion Terlengkap</p> */}
					{fullPath && <QRCode value="hey" className="size-20" />}
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
						<br />#{data.id}
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

export function SearchInvoice({ children }: { children: React.ReactNode }) {
	const { filter, setFilter, getInvoiceAll, invoiceItems } = useInvoiceStore()

	const debouncedSearchValue = useDebounce(filter.name, 1000)

	const fetchProductItems = useCallback(async () => {
		if (filter.name === debouncedSearchValue || filter.name === "") {
			await getInvoiceAll(debouncedSearchValue)
		}
	}, [debouncedSearchValue, filter.name, getInvoiceAll])

	useEffect(() => {
		fetchProductItems()
	}, [fetchProductItems])

	return (
		<>
			<div className="sm:p-6 bg-base-200 rounded-lg shadow-md">
				{/* <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4">Invoices</h2>
            </div> */}
				<div className="flex gap-2 items-center">
					<Form action={"/invoice"} className="join w-full sm:w-fit my-2">
						<input
							type="search"
							name="search"
							className="input input-bordered join-item w-full"
							value={filter.name}
							onChange={(e) => setFilter(e.target.value)}
							placeholder="Search..."
						/>
						<button type="submit" className="join-item btn btn-neutral">
							<Search />
						</button>
					</Form>
					<Link className="btn btn-neutral btn-square" href={"/invoice/form"}>
						<Plus />
					</Link>
					<button
						className="btn btn-success btn-square "
						onClick={() => exportToExcel(invoiceItems)}
					>
						<Sheet />
					</button>
				</div>
				{children}
			</div>
		</>
	)
}
