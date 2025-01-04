export type Context = {
	params: Promise<{ id: string }>
	searchParams: Promise<{ search: string }>
}
