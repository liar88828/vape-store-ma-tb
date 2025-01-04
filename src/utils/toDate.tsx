export const toDate = (date: string | Date | number | undefined | null) => {
	if (!date) {
		return "Date is invalid"
	}
	return new Date(date).toLocaleDateString("id-ID")
}
export const toDateFull = (date: string | Date | number | undefined | null) => {
	if (!date) {
		return "Date is invalid"
	}

	const options: Intl.DateTimeFormatOptions = {
		weekday: "long", // Full weekday name (e.g., Senin)
		year: "numeric",
		month: "long", // Full month name (e.g., Januari)
		day: "numeric",
	}

	return new Date(date).toLocaleDateString("id-ID", options)
}
