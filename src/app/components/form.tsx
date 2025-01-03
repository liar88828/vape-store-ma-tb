'use client'
import { createInvoice } from '@/network/invoice';
import type { InvoiceItem } from '@prisma/client';
import React, { useState } from 'react';
import type { InvoiceData } from '../../interface/invoice';



const InvoiceForm: React.FC = () => {
    const [formData, setFormData] = useState<InvoiceData>({
        customerName: '',
        customerEmail: '',
        date: new Date().toISOString().split('T')[0],
        invoiceNumber: '',
        items: [{ desc: '', price: 0, qty: 1 }],
        accountName: '',
        accountNumber: ''
    });

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { desc: '', price: 0, qty: 1 }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const calculateTotals = () => {
        const subtotal = formData.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * 0.1;
        return { subtotal, tax, total: subtotal + tax };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add submission logic here
        const data = await createInvoice(formData)
        console.log(data)
    };

    const { subtotal, tax, total } = calculateTotals();

    return (
        <form onSubmit={handleSubmit} className=" p-8 space-y-6 dark:bg-gray-50 text-black rounded-xl">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-bold">Customer Details</h3>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Customer Email"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold">Invoice Details</h3>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Invoice Number"
                        value={formData.invoiceNumber}
                        onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold">Items</h3>
                {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={item.desc}
                            onChange={(e) => handleItemChange(index, 'desc', e.target.value)}
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.qty}
                            onChange={(e) => handleItemChange(index, 'qty', parseInt(e.target.value))}
                            className="p-2 border rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="p-2 text-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addItem}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Add Item
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-bold">Payment Details</h3>
                    <input
                        type="text"
                        placeholder="Account Name"
                        value={formData.accountName}
                        onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="space-y-2 text-right">
                    <p>Subtotal: RP {subtotal.toLocaleString()}</p>
                    <p>Tax (10%): RP {tax.toLocaleString()}</p>
                    <p className="font-bold">Total: RP {total.toLocaleString()}</p>
                </div>
            </div>

            <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded font-bold"
            >
                Generate Invoice
            </button>
        </form>
    );
};

export default InvoiceForm;