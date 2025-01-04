import toast from "react-hot-toast"

export const toastHandler = async ({
	fun,
	title,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fun: () => Promise<any>
	title: string
}) => {
	const toastId = toast.loading("Loading...")
	try {
		await fun()
		toast.success(`Success ${title}`)
		return true
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(e.message)
		}
		toast.error(`Fail ${title}`)
		return false
	} finally {
		toast.dismiss(toastId)
	}
}
