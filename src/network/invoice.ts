import { InvoiceData } from "@/interface/invoice"

export const findAllInvoice = async () => {
    const response = await fetch(`http://localhost:3000/api/invoice`)
    const data = await response.json()
    return data as { data: InvoiceData[] }
}

export const findIdInvoice = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/invoice/${id}`)
    const data = await response.json()
    return data as { data: InvoiceData }
}

export const createInvoice = async (invoice: InvoiceData) => {
    const response = await fetch(`http://localhost:3000/api/invoice`, {
        method: 'POST',
        body: JSON.stringify(invoice)
    })
    const data = await response.json()
    return data as { data: InvoiceData }
}


export const UpdateInvoice = async (invoice: InvoiceData, id: string) => {
    const response = await fetch(`http://localhost:3000/api/invoice/${id}`, {
        method: 'PUT',
        body: JSON.stringify(invoice)
    })
    const data = await response.json()
    return data as { data: InvoiceData }
}


export const deleteInvoice = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/invoice/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data as { data: InvoiceData }
}