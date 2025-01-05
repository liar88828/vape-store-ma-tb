"use client"
import { toDate } from "../../../utils/toDate"
import { ReceiptText } from "lucide-react"
import React from "react"
import Link from "next/link"
import { useInvoiceStore } from "../../store/invoice.store"
import { PageLoading } from "../Loading"

const InvoiceTable: React.FC = ({}) => {
	const { invoiceItems, isLoading } = useInvoiceStore()
	// console.log(isLoading)
	if (!invoiceItems || isLoading) {
		return <PageLoading />
	}

	return (
		<div className="overflow-x-auto ">
			<table className=" table table-xs " data-theme="light">
				<thead>
					<tr className="">
						<th className=" px-4 py-2 text-left">Customer Name</th>
						<th className=" px-4 py-2 text-left">Customer Email</th>
						<th className=" px-4 py-2 text-left">Customer Phone</th>
						<th className=" px-4 py-2 text-left">Date</th>
						<th className=" px-4 py-2 text-right">Total</th>
						<th className=" px-4 py-2 text-left">Description</th>
						<th className=" px-4 py-2 text-right">Price</th>
						<th className=" px-4 py-2 text-right">Quantity</th>
						<th className=" px-4 py-2 text-right">Total</th>
						<th className=" px-4 py-2 text-right">Action</th>
					</tr>
				</thead>
				<tbody>
					{invoiceItems.map((invoice) => (
						<tr className="hover:bg-gray-50" key={invoice.id}>
							<td className="px-4 py-2">{invoice.customerName}</td>
							<td className="px-4 py-2">{invoice.customerEmail}</td>
							<td className="px-4 py-2">{invoice.customerPhone}</td>
							<td className="px-4 py-2">{toDate(invoice.date)}</td>
							<td className=" px-4 py-2 text-right">
								{invoice.items.reduce(
									(total, item) => total + item.price * item.qty,
									0
								)}
							</td>
							<td className=" px-4 py-2">
								{invoice.items.map((item) => item.name)}
							</td>
							<td className=" px-4 py-2 text-right">
								{invoice.items.map((item) => item.price)}
							</td>
							<td className=" px-4 py-2 text-right">
								{invoice.items.map((item) => item.qty)}
							</td>
							<td className=" px-4 py-2 text-right">
								{invoice.items.reduce(
									(total, item) => total + item.price * item.qty,
									0
								)}
							</td>
							<td className=" px-4 py-2 text-right">
								<Link
									href={`/invoice/${invoice.id}`}
									className="btn btn-square btn-info"
								>
									<ReceiptText />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default InvoiceTable
