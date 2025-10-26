import { useState, useEffect, useCallback, useMemo } from 'react';
import IInventory from '../types/IInventory';
import IQuotedProduct from '../types/IQuotedProduct';
import { requestAllInventoryByProductID, requestAllQuotesByProductId } from '../utils/Requests';

interface ConditionCounts {
    factorySealed: number;
    newOpenedBox: number;
    refurbished: number;
    renew: number;
    used: number;
    damaged: number;
}

interface QuoteInfo {
    averageQuote: number;
    lastQuotedPrice: number;
    quotedBy: string;
    quotedTo: string;
}

export const useExpandedRowData = (productId: number | undefined) => {
    const [inventory, setInventory] = useState<IInventory[]>([]);
    const [quotedProducts, setQuotedProducts] = useState<IQuotedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (productId === undefined) return;

        setLoading(true);
        try {
            const [inventoryData, quotesData] = await Promise.all([
                requestAllInventoryByProductID(productId),
                requestAllQuotesByProductId(productId),
            ]);
            setInventory(inventoryData);
            setQuotedProducts(quotesData);
        } catch (err) {
            console.error('Failed to fetch expanded row data:', err);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    const quoteInfo = useMemo((): QuoteInfo => {
        if (quotedProducts.length === 0) {
            return { averageQuote: 0, lastQuotedPrice: 0, quotedBy: '', quotedTo: '' };
        }

        let totalQuote = 0;
        let latestQuote = quotedProducts[0];

        for (const product of quotedProducts) {
            totalQuote += product.quotedPrice;
            if (new Date(product.quote?.dateQuoted as Date) > new Date(latestQuote.quote?.dateQuoted as Date)) {
                latestQuote = product;
            }
        }

        return {
            averageQuote: totalQuote / quotedProducts.length,
            lastQuotedPrice: latestQuote.quotedPrice,
            quotedBy: `${latestQuote.quote?.user?.firstName || ''} ${latestQuote.quote?.user?.lastName || ''}`.trim(),
            quotedTo: latestQuote.quote?.company?.name || '',
        };
    }, [quotedProducts]);


    return { inventory, quotedProducts, loading, conditionCounts, quoteInfo, refetchData: fetchData };
};
