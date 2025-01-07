"use client"
import { type IDetectedBarcode, Scanner, useDevices, } from "@yudiel/react-qr-scanner"
import { useState } from "react"
import { useProductStore } from "../../store/product.store"
import { ProductItem } from "../product/item"
import { InvoiceForm } from "../product/form"
import Loading from "../Loading"

export default function ScanPage() {
    // const styles = {
    // 	container: {
    // 		width: 400,
    // 		margin: "auto",
    // 	},
    // 	controls: {
    // 		marginBottom: 8,
    // 	},
    // }

    // const [tracker, setTracker] = useState<string | undefined>("centerText")
	const [deviceId, setDeviceId] = useState<string | undefined>(undefined)
	const devices = useDevices()

	const [resultScan, setResultScan] = useState("")
	const [pause, setPause] = useState(false)

    // function getTracker() {
    // 	switch (tracker) {
    // 		case "outline":
    // 			return outline
    // 		case "boundingBox":
    // 			return boundingBox
    // 		case "centerText":
    // 			return centerText
    // 		default:
    // 			return undefined
    // 	}
    // }
	// const debouncedSearchValue = useDebounce(resultScan, 500)

	const handleScan = (result: IDetectedBarcode[]) => {
		if (!pause) {
			setResultScan(result[0].rawValue) // Update state only when not paused
			setPause(true) // Pause the scanner after scanning
			getProductScan(result[0].rawValue)
		}
	}

    // const resumeScanning = () => {
    // 	setPause((val) => !val) // Resume scanning
    // }

	const { productScan, getProductScan, isLoading } = useProductStore()

	// const fetchProductItems = useCallback(async () => {
	// 	await getProductScan(debouncedSearchValue)
	// }, [getProductScan, debouncedSearchValue])

	// useEffect(() => {
	// 	fetchProductItems()
	// }, [])
	// console.log(productScan)
	return (
        <div className="space-y-5">

            <select onChange={ (e) => setDeviceId(e.target.value) }>
                <option value={ undefined }>Select a device</option>
                { devices.map((device, index) => (
                    <option key={ index } value={ device.deviceId }>
                        { device.label }
                    </option>
                )) }
            </select>

            {/*<div style={ styles.controls } className="hidden">*/ }
            {/*    <select*/ }
            {/*        style={ { marginLeft: 5 } }*/ }
            {/*        onChange={ (e) => setTracker(e.target.value) }*/ }
            {/*    >*/ }
            {/*        <option value="centerText">Center Text</option>*/ }
            {/*        <option value="outline">Outline</option>*/ }
            {/*        <option value="boundingBox">Bounding Box</option>*/ }
            {/*        <option value={ undefined }>No Tracker</option>*/ }
            {/*    </select>*/ }
            {/*</div>*/ }

            {/*<div className="join w-full">*/ }
            {/*    <input*/ }
            {/*        type="text"*/ }
            {/*        className="input input-bordered join-item w-full"*/ }
            {/*        value={ resultScan }*/ }
            {/*        onChange={ (e) => setResultScan(e.target.value) }*/ }
            {/*        placeholder="Enter barcode"*/ }
            {/*    />*/ }

            {/*    <button*/ }
            {/*        className={ ` join-item btn-square btn  ${*/ }
            {/*            !pause ? "btn-error" : "btn-success"*/ }
            {/*        }` }*/ }
            {/*        onClick={ resumeScanning }*/ }
            {/*    >*/ }
            {/*        { !pause ? <PowerOff/> : <Power/> }*/ }
            {/*    </button>*/ }
            {/*</div>*/ }
            {/*<h1>{ JSON.stringify(state, null, 2) }</h1>*/ }

            { pause && (
                <>
                    { isLoading ? (
                        <Loading/>
                    ) : (
                        <div className="">
                            { productScan ? (
                                <ProductItem item={ productScan } isSelect={ false }/>
                            ) : (
                                <div className="p-5">
                                    <InvoiceForm method="POST" id={ resultScan }/>
                                </div>
                            ) }
                        </div>
                    ) }
                </>
            ) }

            <Scanner
                onScan={ handleScan }
                paused={ pause }
                constraints={ {
                    deviceId: deviceId,
                } }
                formats={ [
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
                ] }
                allowMultiple={ false }
                scanDelay={ 2000 }
                components={ {
                    audio: true,
                    onOff: true,
                    torch: true,
                    zoom: true,
                    finder: true,
                    // tracker: getTracker(),
                } }
            />
        </div>
    )
}
