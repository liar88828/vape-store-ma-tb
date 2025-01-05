import React from "react"

export default function Loading() {
	return <span className="loading loading-spinner loading-lg"></span>
}

export function PageLoading() {
	return (
		<div className="flex justify-center">
			<span className="loading loading-spinner loading-lg"></span>
		</div>
	)
}
