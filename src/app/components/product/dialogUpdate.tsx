'use client'

import { useProductStore } from '../../store/product.store';
import { InvoiceForm } from './form'

export function ProductDialogUpdate() {
    const { productItem } = useProductStore();
    return (
        <dialog id="my_product_update" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <InvoiceForm method='PUT' id={productItem.id} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
