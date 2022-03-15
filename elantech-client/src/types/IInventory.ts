interface IInventory {
    serial_number?: number;
    product_number?: string;
    condition?: string;
    seller_name?: string;
    order_number?: string;
    date_received?: Date;
    warranty_expiration?: string;
    comment?: string;
    location?: string;
    tested?: string;
    reserved?: string;
}

export default IInventory;