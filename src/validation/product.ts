import { z } from "zod"

export const ProductSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, "Description is required"),
	price: z.number().positive("Price must be positive"),
	qty: z.number().int().positive("Quantity must be a positive integer"),
})
