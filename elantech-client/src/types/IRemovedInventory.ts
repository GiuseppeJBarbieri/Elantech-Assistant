interface IRemovedInventory {
    id?: number;
    userId?: number;
    orderId?: number;
    reasonType?: string;
    reason?: string;
    dateRemoved?: string;
}

export default IRemovedInventory;
