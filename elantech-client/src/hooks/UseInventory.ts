import { useState, useEffect, useCallback, useMemo } from 'react';
import IInventory from '../types/IInventory';
import { requestAllInventoryByProductID } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import { defaultAlert } from '../constants/Defaults';
import IAlert from '../types/IAlert';

interface ConditionCounts {
    factorySealed: number;
    newOpenedBox: number;
    refurbished: number;
    renew: number;
    used: number;
    damaged: number;
}

export const UseExpandedRowData = (productId: number | undefined) => {
    const [inventory, setInventory] = useState<IInventory[]>([]);
    const [alert, setAlert] = useState<IAlert>(defaultAlert);

    const fetchInventoryData = useCallback(async () => {
        if (productId === undefined) return;
        try {
            const inventoryData = await requestAllInventoryByProductID(productId);
            setInventory(inventoryData);
            setAlert((prev) => ({ ...prev, label: 'Table has been updated', type: 'success', show: true }));
            setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
        } catch (error) {
            setAlert((prev) => ({ ...prev, label: `Failed to fetch expanded row data: ${error}`, show: true, type: 'danger' }));
            setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
        }
    }, [productId]);

    useEffect(() => {
        fetchInventoryData();

        SocketService.connect();
        SocketService.on('inventory.updated', fetchInventoryData);

        return () => SocketService.off('inventory.updated', fetchInventoryData);
    }, [fetchInventoryData]);

    const conditionCounts = useMemo((): ConditionCounts => {
        return inventory.reduce((acc, item) => {
            if (item.condition === 'New Factory Sealed') acc.factorySealed++;
            else if (item.condition === 'New Opened Box') acc.newOpenedBox++;
            else if (item.condition === 'Refurbished') acc.refurbished++;
            else if (item.condition === 'Renew') acc.renew++;
            else if (item.condition === 'Used') acc.used++;
            else if (item.condition === 'Damaged') acc.damaged++;
            return acc;
        }, { factorySealed: 0, newOpenedBox: 0, refurbished: 0, renew: 0, used: 0, damaged: 0 });
    }, [inventory]);

    return { inventory, conditionCounts, alert, fetchInventoryData };
};
