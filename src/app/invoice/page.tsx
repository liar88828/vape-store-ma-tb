import React from 'react'
import { findAllInvoice } from '../../network/invoice'
import InvoiceTable from '@/app/components/table'

export default async function page() {

    const data = await findAllInvoice()
    if (!data) {
        return <h1>Loading</h1>
    }
    if (data.data.length === 0) {
        return <h1>Data is Empty</h1>
    }
    return (
        <InvoiceTable invoices={data.data} />

    )
}
