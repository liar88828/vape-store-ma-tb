import { z } from 'zod';

const InvoiceItemSchema = z.object({
    desc: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be positive'),
    qty: z.number().int().positive('Quantity must be a positive integer')
});

export const InvoiceSchema = z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    customerEmail: z.string().email('Invalid email address'),
    date: z.coerce.date(),
    invoiceNumber: z.string(),
    items: z.array(InvoiceItemSchema).min(1, 'At least one item is required'),
    accountName: z.string().min(1, 'Account name is required'),
    accountNumber: z.string()
});

// export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;

// // Validation function
// export const validateInvoice = (data: unknown) => {
//     return InvoiceSchema.safeParse(data);
// };

// // Example usage
// export const validateAndCreateInvoice = async (data: unknown) => {
//     const validation = validateInvoice(data);

//     if (!validation.success) {
//         throw new Error(validation.error.errors.map(e => e.message).join(', '));
//     }

//     return validation.data;
// };