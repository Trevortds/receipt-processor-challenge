
export interface ReceiptItem {
    shortDescription: string;
    price: string;
}

export interface Receipt {
    retailer: string;
    purchaseDate: string;
    purchaseTime: string;
    items: ReceiptItem[];
    total: string;
}