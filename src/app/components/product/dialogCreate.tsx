'use client'

import { InvoiceForm } from './form'

export function ProductDialogCreate() {
    return (
        <dialog id="my_product_create" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <InvoiceForm method='POST' />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
