import { InvoiceInterface } from "@/interface/invoice"
import { toDate } from "../../../utils/toDate"
import { SearchInvoice } from "./invoice"
import { ReceiptText } from "lucide-react"
import React from "react"
import Link from "next/link"

const InvoiceTable: React.FC<{ invoices: InvoiceInterface[] }> = ({
	invoices,
}) => {
	return (
		<div className="sm:p-6 bg-base-200 rounded-lg shadow-md">
			{/* <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4">Invoices</h2>
            </div> */}
			<SearchInvoice invoices={invoices} />
			<div className="overflow-x-auto ">
				<table className=" table table-xs " data-theme="light">
					<thead>
						<tr className="">
							<th className=" px-4 py-2 text-left">Invoice Number</th>
							<th className=" px-4 py-2 text-left">Customer Name</th>
							<th className=" px-4 py-2 text-left">Customer Email</th>
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
						{invoices.map((invoice) => (
							<tr className="hover:bg-gray-50" key={invoice.id}>
								<td className="px-4 py-2">{invoice.invoiceNumber}</td>
								<td className="px-4 py-2">{invoice.customerName}</td>
								<td className="px-4 py-2">{invoice.customerEmail}</td>
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
		</div>
	)
}

export default InvoiceTable
