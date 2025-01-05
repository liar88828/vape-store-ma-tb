import { useEffect, useState } from "react"

export default function useDebounce<T>(
	value: T,
	delay: number,
	fun?: () => void
): T {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay)

		return () => {
			if (fun) {
				fun()
			}
			return clearTimeout(handler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, delay])

	return debouncedValue
}
