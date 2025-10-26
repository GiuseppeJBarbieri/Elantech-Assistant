import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_API_URL, ROUTES } from '../constants/API';
import ICompany from '../types/ICompany';
import IInventory from '../types/IInventory';
import IProduct from '../types/IProduct';
import IQuote from '../types/IQuote';
import IQuotedProduct from '../types/IQuotedProduct';
import IRemovedInventory from '../types/IRemovedInventory';
import IReceiving from '../types/IReceiving';
import IReceivedItem from '../types/IReceivedItem';

// Create a reusable Axios instance with common configurations
const api: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true, // This applies to all requests made with this instance
});

/**
 * Helper function to extract a single item payload from Axios responses.
 * Assumes API responses are structured as { data: { payload: T | T[] } }.
 * If payload is an array, it returns the first element. Otherwise, it returns the payload directly.
 *
 * @param response The AxiosResponse object.
 * @returns The extracted single item payload, or null if the payload is not found or empty.
 */
function extractSinglePayload<T>(response: AxiosResponse<any>): T | null {
    if (response?.data?.payload !== undefined && response.data.payload !== null) {
        if (Array.isArray(response.data.payload) && response.data.payload.length > 0) {
            return response.data.payload[0] as T;
        }
        return response.data.payload as T;
    }
    return null;
}

/**
 * Helper function to extract an array payload from Axios responses.
 * Assumes API responses are structured as { data: { payload: T | T[] } }.
 * If payload is a single item, it wraps it in an array.
 *
 * @param response The AxiosResponse object.
 * @returns The extracted array payload, or an empty array if the payload is not found or empty.
 */
function extractArrayPayload<T>(response: AxiosResponse<any>): T[] {
    if (response?.data?.payload !== undefined && response.data.payload !== null) {
        if (Array.isArray(response.data.payload)) {
            return response.data.payload[0] as T[];
        }
        // If payload is a single item, wrap it in an array
        return [response.data.payload as T];
    }
    return [];
}

// USERS
export const requestLogout = async (): Promise<AxiosResponse<unknown, unknown>> => {
    return api.get(`${ROUTES.USERS}/logout`);
}

// PRODUCTS
export const requestAllProducts = async (): Promise<IProduct[]> => {
    const response = await api.get(`${ROUTES.PRODUCTS}`);
    return extractArrayPayload<IProduct>(response);
}
export const requestAddProduct = async (product: IProduct): Promise<IProduct | null> => {
    const response = await api.post(`${ROUTES.PRODUCTS}`, product);
    return extractSinglePayload<IProduct>(response);
}
export const requestUpdateProduct = async (product: IProduct): Promise<IProduct | null> => {
    const response = await api.put(`${ROUTES.PRODUCTS}`, product);
    return extractSinglePayload<IProduct>(response);
}
export const requestDeleteProduct = async (id: number): Promise<IProduct | null> => {
    const response = await api.delete(`${ROUTES.PRODUCTS}/${id}`);
    return extractSinglePayload<IProduct>(response);
}

// INVENTORY
export const requestAllInventoryByProductID = async (id: number): Promise<IInventory[]> => {
    const response = await api.get(`${ROUTES.INVENTORY}/product/${id}`);
    return extractArrayPayload<IInventory>(response);
}
export const requestUpdateInventory = async (inventory: IInventory): Promise<IInventory | null> => {
    const response = await api.put(`${ROUTES.INVENTORY}`, inventory);
    return extractSinglePayload<IInventory>(response);
}
export const requestUpdateMultipleInventory = async (inventory: IInventory[]): Promise<IInventory[]> => {
    const response = await api.put(`${ROUTES.INVENTORY}/multiple`, inventory);
    // Assuming this returns an array of updated inventories, or wraps a single one if that's what the API sends.
    return extractArrayPayload<IInventory>(response);
}
export const requestAddInventory = async (inventory: IInventory): Promise<IInventory | null> => {
    const response = await api.post(`${ROUTES.INVENTORY}`, inventory);
    return extractSinglePayload<IInventory>(response);
}
export const requestAddMultipleInventory = async (inventory: IInventory[]): Promise<IInventory[]> => {
    const response = await api.post(`${ROUTES.INVENTORY}/multiple`, inventory);
    return extractArrayPayload<IInventory>(response);
}
export const requestAddMultipleInventoryReceiving = async (inventory: IInventory[], receivedItemId: number): Promise<IInventory[]> => {
    const response = await api.post(`${ROUTES.INVENTORY}/receiving/multiple`, { inventory, receivedItemId });
    return extractArrayPayload<IInventory>(response);
}
export const requestRemoveInventory = async (inventoryList: IInventory[]): Promise<IInventory[]> => {
    const response = await api.delete(`${ROUTES.INVENTORY}`, { data: inventoryList });
    // Assuming this returns an array of removed items, or wraps a single one.
    return extractArrayPayload<IInventory>(response);
}

// COMPANY
export const requestAllCompanies = async (): Promise<ICompany[]> => {
    const response = await api.get(`${ROUTES.COMPANY}`);
    return extractArrayPayload<ICompany>(response);
}
export const requestAddCompany = async (company: ICompany): Promise<ICompany | null> => {
    const response = await api.post(`${ROUTES.COMPANY}`, company);
    return extractSinglePayload<ICompany>(response);
}
export const requestUpdateCompany = async (company: ICompany): Promise<ICompany | null> => {
    const response = await api.put(`${ROUTES.COMPANY}`, company);
    return extractSinglePayload<ICompany>(response);
}
export const requestDeleteCompany = async (id: number): Promise<ICompany | null> => {
    const response = await api.delete(`${ROUTES.COMPANY}/${id}`);
    return extractSinglePayload<ICompany>(response);
}

// QUOTES
export const requestAllQuotesByCompanyID = async (companyId: number): Promise<IQuote[]> => {
    const response = await api.get(`${ROUTES.QUOTE}/${ROUTES.COMPANY}/${companyId}`);
    return extractArrayPayload<IQuote>(response);
};
export const requestAddQuote = async (quote: IQuote): Promise<IQuote | null> => {
    const response = await api.post(`${ROUTES.QUOTE}`, quote);
    return extractSinglePayload<IQuote>(response);
}
export const requestUpdateQuoteAndQuotedProducts = async (quote: IQuote): Promise<IQuote | null> => {
    const response = await api.put(`${ROUTES.QUOTE}/${ROUTES.QUOTED_PRODUCTS}`, quote);
    return extractSinglePayload<IQuote>(response);
}
export const requestDeleteQuote = async (id: number): Promise<IQuote | null> => {
    const response = await api.delete(`${ROUTES.QUOTE}/${id}`);
    return extractSinglePayload<IQuote>(response);
}
export const requestAllProductQuotesByQuoteId = async (quoteId: number): Promise<IQuotedProduct[]> => {
    const response = await api.get(`${ROUTES.QUOTED_PRODUCTS}/${ROUTES.QUOTE}/${quoteId}`);
    return extractArrayPayload<IQuotedProduct>(response);
}

// QUOTED PRODUCTS
export const requestAddQuotedProduct = async (quotedProduct: IQuotedProduct): Promise<IQuotedProduct | null> => {
    const response = await api.post(`${ROUTES.QUOTED_PRODUCTS}`, quotedProduct);
    return extractSinglePayload<IQuotedProduct>(response);
}
export const requestGetQuotedProductsByQuoteId = async (quoteId: number): Promise<IQuotedProduct[]> => {
    const response = await api.get(`${ROUTES.QUOTED_PRODUCTS}/quote/${quoteId}`);
    return extractArrayPayload<IQuotedProduct>(response);
}
export const requestAllQuotesByProductId = async (productId: number): Promise<IQuotedProduct[]> => {
    const response = await api.get(`${ROUTES.QUOTED_PRODUCTS}/product/${productId}`);
    return extractArrayPayload<IQuotedProduct>(response);
}

// REMOVED INVENTORY
export const requestAddRemovedInventory = async (removedInventory: IRemovedInventory): Promise<IRemovedInventory | null> => {
    const response = await api.post(`${ROUTES.REMOVED_INVENTORY}`, removedInventory);
    return extractSinglePayload<IRemovedInventory>(response);
}

// Receiving
export const RequestAddReceivingOrder = async (receiving: IReceiving): Promise<IReceiving | null> => {
    const response = await api.post(`${ROUTES.RECEIVING}`, receiving);
    return extractSinglePayload<IReceiving>(response);
};
export const requestAllReceiving = async (): Promise<IReceiving[]> => {
    const response = await api.get(`${ROUTES.RECEIVING}`);
    return extractArrayPayload<IReceiving>(response);
}
export const RequestUpdateReceivingOrder = async (receiving: IReceiving): Promise<IReceiving | null> => {
    const response = await api.put(`${ROUTES.RECEIVING}`, receiving);
    return extractSinglePayload<IReceiving>(response);
};
export const RequestDeleteReceivingOrder = async (receiving: IReceiving): Promise<void> => {
    await api.delete(`${ROUTES.RECEIVING}/${receiving.id}`);
};

// Received Items
export const requestAllReceivedItems = async (receivingId: number): Promise<IReceivedItem[]> => {
    const response = await api.get(`${ROUTES.RECEIVED_ITEM}/receiving/${receivingId}`);
    return extractArrayPayload<IReceivedItem>(response);
}
export const requestAddReceivedItems = async (receivedItems: IReceivedItem[]): Promise<IReceivedItem[]> => {
    const response = await api.post(`${ROUTES.RECEIVED_ITEM}/multiple`, receivedItems);
    return extractArrayPayload<IReceivedItem>(response);
}
export const requestEditReceivedItem = async (receivedItem: IReceivedItem): Promise<IReceivedItem | null> => {
    const response = await api.put(`${ROUTES.RECEIVED_ITEM}`, receivedItem);
    return extractSinglePayload<IReceivedItem>(response);
}
export const requestRemoveReceivedItem = async (id: number): Promise<void> => {
    await api.delete(`${ROUTES.RECEIVED_ITEM}/${id}`);
}