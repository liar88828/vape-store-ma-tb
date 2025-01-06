"use client"
import { Minus } from "lucide-react"
import { useInvoiceStore } from "@/app/store/invoice.store"
import { useRouter } from "next/navigation"
import { toRupiah } from "@/utils/toRupiah"
import { InvoiceProductSearchDialogAction } from "@/app/components/invoice/dialogInvoice"
import { InvoiceProductScanDialogAction } from "@/app/components/scan/dialogScan"

const InvoiceForm: React.FC = () => {
	const {
		formData,
		setField,
		handleItemChange,
		removeItem,
		calculateTotals,
		addInvoiceItem,
		setTax,
		tax: onTax,
	} = useInvoiceStore()
	const route = useRouter()
	const { subtotal, tax, total } = calculateTotals()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const response = await addInvoiceItem(formData)
		if (response) {
			route.back()
		}
	}

	return (
		<div className="">
			<div className="card bg-base-200">
				<form onSubmit={handleSubmit} className=" card-body">
					<div className="text-center ">
						<h1 className=" mb-10 font-bold text-2xl ">Create Invoice</h1>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-bold">Customer Details</h3>
							<label className="form-control">
								<span className="">Customer Nama</span>
								<input
									type="text"
									placeholder="Customer Nama"
									value={formData.customerName}
									onChange={(e) => setField("customerName", e.target.value)}
									className="w-full input input-bordered"
									required
								/>
							</label>
							<label className="form-control">
								<span className="">Customer Email</span>
								<input
									type="email"
									placeholder="Customer Email"
									value={formData.customerEmail}
									onChange={(e) => setField("customerEmail", e.target.value)}
									className="w-full input input-bordered"
									required
								/>
							</label>
						</div>

						<div className="space-y-4">
							<h3 className="font-bold">Invoice Details</h3>
							<label className="form-control">
								<span className="">Tanggal Beli</span>
								<input
									type="date"
									value={formData.date}
									onChange={(e) => setField("date", e.target.value)}
									className="w-full input input-bordered"
									required
								/>
							</label>
							<label className="form-control">
								<span className="">Customer HP</span>
								<input
									type="text"
									placeholder="Customer Phone"
									value={formData.customerPhone}
									onChange={(e) => setField("customerPhone", e.target.value)}
									className="w-full input input-bordered"
									required
								/>
							</label>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="font-bold">Items</h3>
						{formData.items.map((item, index) => (
							<div key={index} className="flex justify-between gap-4">
								<label className="">
									<span className="">Nama</span>
									<input
										type="text"
										placeholder="Nama Product"
										value={item.name}
										onChange={(e) =>
											handleItemChange(index, "name", e.target.value)
										}
										className="input input-bordered w-full"
										required
									/>
								</label>
								<label className="">
									<span className="">Harga</span>
									<input
										type="number"
										placeholder="Price "
										value={item.price}
										onChange={(e) =>
											handleItemChange(index, "price", Number(e.target.value))
										}
										className="input input-bordered w-full"
										required
									/>
								</label>
								<label className="">
									<span className="">Jumlah</span>
									<input
										type="number"
										placeholder="Quantity"
										value={item.qty}
										onChange={(e) =>
											handleItemChange(index, "qty", Number(e.target.value))
										}
										className="input input-bordered w-full"
										required
									/>
								</label>
								<label className="flex  items-end">
									<button
										type="button"
										onClick={() => removeItem(index)}
										className="btn btn-error btn-square"
									>
										<Minus />
									</button>
								</label>
							</div>
						))}
						<div className="flex gap-2">
							<InvoiceProductSearchDialogAction />
							<InvoiceProductScanDialogAction />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-bold">Payment Details</h3>
							<label className="form-control">
								<span className="">Jenis Pembayaran</span>
								<input
									type="text"
									placeholder="Jenis Pembayaran"
									value={formData.accountName}
									onChange={(e) => setField("accountName", e.target.value)}
									className="w-full input input-bordered"
									required
								/>
							</label>
							<label className="form-control">
								<span className="">No Rekening</span>
								<input
									type="text"
									placeholder="No Req"
									value={formData.accountNumber}
									onChange={(e) => setField("accountNumber", e.target.value)}
									className="w-full input input-bordered"
									required
								/>
							</label>
						</div>
						<div className="space-y-2 text-right">
							<p>Subtotal: RP {toRupiah(subtotal)}</p>
							<p>
								Tax{" "}
								<input
									className="input input-bordered w-14"
									type="number"
									onChange={(e) => setTax(Number(e.target.value))}
									value={onTax}
								/>
								% {/* (10%) */}: {toRupiah(tax)}
							</p>
							<p className="font-bold">Total: {toRupiah(total)}</p>
						</div>
					</div>
					<div className="card-actions mt-2">
						<button type="submit" className="btn btn-success w-full">
							Generate Invoice
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default InvoiceForm
