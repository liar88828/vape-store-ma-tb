export const toRupiah = (price: number | undefined | null) => {
	// console.log(price)
	if (price === 0) {
		return "Rp. 0,00"
	}
	if (!price) {
		return "Number is invalid"
	}

	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(price)
}
