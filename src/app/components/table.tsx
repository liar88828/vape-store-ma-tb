import { InvoiceData } from '@/interface/invoice';
import React from 'react';
import { date } from 'zod';
import invoice from './invoice';
import { format } from 'path';
import type style from 'styled-jsx/style';
import { table } from 'console';
import Link from 'next/link';

export const toDate = (date: string | Date | number | undefined | null) => {
    if (!date) {
        return 'Date is invalid'
    }
    return new Date(date).toLocaleDateString('id-ID')
}


export const toRupiah = (date: number | undefined | null) => {
    if (!date) {
        return 'Number is invalid'
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(5000)
}

const InvoiceTable: React.FC<{ invoices: InvoiceData[] }> = ({ invoices }) => {

    return (
        <div className="sm:p-6 bg-base-200 rounded-lg shadow-md">
            {/* <div className="flex justify-between my-2">
                <h2 className="text-2xl font-bold mb-4">Invoices</h2>
            </div> */}
            <SearchInvoice />
            <div className="overflow-x-auto ">

                <table className=" table">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Invoice Number</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Customer Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Price</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                            <th className="border border-gray-300 px-4 py-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <React.Fragment key={invoice.accountName}>
                                <tr className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{invoice.invoiceNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.customerName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.customerEmail}</td>
                                    <td className="border border-gray-300 px-4 py-2">{toDate(invoice.date)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {invoice.items.reduce((total, item) => total + item.price * item.qty, 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{invoice.items.map(item => item.desc)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">{invoice.items.map(item => item.price)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">{invoice.items.map(item => item.qty)}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {invoice.items.reduce((total, item) => total + item.price * item.qty, 0)}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        <Link href={`/invoice/${invoice.id}`} className='btn btn-info'>Detail</Link>
                                    </td>
                                </tr>

                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div >
        </div >
    );
};

export default InvoiceTable;


export function SearchInvoice() {
    return (
        <div className='join w-full sm:w-fit my-2' >
            <input type="search" className='input input-bordered join-item w-full' />
            <button type="button" className="join-item btn btn-neutral">Search</button>
        </div>
    )
}
