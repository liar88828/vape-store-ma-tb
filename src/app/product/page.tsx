'use client'
import { InvoiceList } from '../components/product/item'
import { Suspense } from 'react'
import Loading from '../components/Loading'
import { ProductDialogUpdate } from '../components/product/dialogUpdate'
import { ProductDialogCreate } from '../components/product/dialogCreate'

export default function page() {

    return (
        <div className="">
            <Suspense fallback={<Loading />}>
                <InvoiceList />
            </Suspense>
            <ProductDialogCreate />
            <ProductDialogUpdate />
        </div>
    )
}
