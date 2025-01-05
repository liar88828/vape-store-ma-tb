import { ScanBarcode } from "lucide-react"
import { useProductStore } from "../../store/product.store"
import ScanForm from "./scanForm"

export function InvoiceProductScanDialogShow() {
	return (
		<dialog id="my_product_scan" className="modal  modal-middle">
			<div className="modal-box">
				<ScanForm />
			</div>

			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}

export function InvoiceProductScanDialogAction() {
	const { setProductItemPartial } = useProductStore()

	return (
		<button
			type="button"
			onClick={() => {
				setProductItemPartial({ name: "", price: 0, qty: 0, id: "" })
				const modal = document.getElementById(
					"my_product_scan"
				) as HTMLDialogElement
				modal.showModal()
			}}
			className="btn-square btn btn-info "
		>
			<ScanBarcode />
		</button>
	)
}
