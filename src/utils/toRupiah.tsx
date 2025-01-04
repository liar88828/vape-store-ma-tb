

export const toRupiah = (date: number | undefined | null) => {
    if (!date) {
        return 'Number is invalid';
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(5000);
};
