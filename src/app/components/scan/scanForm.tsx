"use client"
import {
	Scanner,
	useDevices,
	type IDetectedBarcode,
} from "@yudiel/react-qr-scanner"
import { useState } from "react"
import { useProductStore } from "../../store/product.store"
import { ProductItem } from "../product/item"
import { Power, PowerOff } from "lucide-react"
import Loading from "../Loading"
import { InvoiceForm } from "../product/form"
export default function ScanForm() {
	const [deviceId, setDeviceId] = useState<string | undefined>(undefined)
	const devices = useDevices()

	const { productScan, getProductScan, isLoading, isCreate, setCreate } =
		useProductStore()

	const [resultScan, setResultScan] = useState("")
	const [pause, setPause] = useState(false)

	const handleScan = (result: IDetectedBarcode[]) => {
		if (!pause) {
			setResultScan(result[0].rawValue) // Update state only when not paused
			setPause(true) // Pause the scanner after scanning
			getProductScan(result[0].rawValue)
		}
	}

	const resumeScanning = () => {
		setPause((val) => !val) // Resume scanning
	}

	return (
		<div className="space-y-5">
			<div className="flex justify-between">
				<div className=""></div>
				<select
					className="hidden"
					onChange={(e) => setDeviceId(e.target.value)}
				>
					<option value={undefined}>Select a device</option>
					{devices.map((device, index) => (
						<option key={index} value={device.deviceId}>
							{device.label}
						</option>
					))}
				</select>
				{/* <button
					onClick={() => {
						const modal = document.getElementById(
							"my_product_scan"
						) as HTMLDialogElement
						modal.close()
					}}
					className="btn btn-ghost btn-square"
				>
					<X />
				</button> */}
			</div>
			<div className="join w-full">
				<input
					type="text"
					className="input input-bordered join-item w-full"
					value={resultScan}
					onChange={(e) => setResultScan(e.target.value)}
					placeholder="Enter barcode"
				/>

				<button
					className={` join-item btn-square btn  ${
						!pause ? "btn-error" : "btn-success"
					}`}
					onClick={resumeScanning}
				>
					{!pause ? <PowerOff /> : <Power />}
				</button>
			</div>
			{/* <h1>{JSON.stringify(state, null, 2)}</h1> */}

			{pause && (
				<>
					{isLoading ? (
						<Loading />
					) : (
						<div className="">
							{productScan ? (
								<>
									<ProductItem item={productScan} isSelect={true} />
									{/* <InvoiceDialogActionClose
										isKey="my_product_scan"
										item={productScan}
									/> */}
								</>
							) : (
								<div className="">
									<h1 className="text-2xl font-bold mb-4">
										Product is Not Found
									</h1>
									<button
										type="button"
										className="btn btn-info"
										onClick={() => {
											setCreate(true)
										}}
									>
										Create
									</button>
									{isCreate && <InvoiceForm method="POST" id={resultScan} />}
								</div>
							)}
						</div>
					)}
				</>
			)}

			<Scanner
				constraints={{
					deviceId: deviceId,
				}}
				onScan={handleScan}
				paused={pause}
				formats={[
					"qr_code",
					"micro_qr_code",
					"rm_qr_code",
					"maxi_code",
					"pdf417",
					"aztec",
					"data_matrix",
					"matrix_codes",
					"dx_film_edge",
					"databar",
					"databar_expanded",
					"codabar",
					"code_39",
					"code_93",
					"code_128",
					"ean_8",
					"ean_13",
					"itf",
					"linear_codes",
					"upc_a",
					"upc_e",
				]}
				allowMultiple={false}
				scanDelay={2000}
				components={{
					audio: true,
					onOff: true,
					torch: true,
					zoom: true,
					finder: true,
				}}
			/>
		</div>
	)
}
