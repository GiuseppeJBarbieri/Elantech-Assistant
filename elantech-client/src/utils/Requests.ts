import axios, { AxiosResponse } from 'axios';
import { BASE_API_URL, ROUTES } from '../constants/API';
import ICompany from '../types/ICompany';
import IInventory from '../types/IInventory';
import IProduct from '../types/IProduct';
import IQuote from '../types/IQuote';
import IQuotedProduct from '../types/IQuotedProduct';
import IRemovedInventory from '../types/IRemovedInventory';
import IReceiving from '../types/IReceiving';
import IReceivedItem from '../types/IReceivedItem';

// USERS
export const requestLogout = async (): Promise<AxiosResponse<unknown, unknown>> => {
    return axios.get(`${BASE_API_URL}${ROUTES.USERS}/logout`, { withCredentials: true }).then((response) => response);
}

// PRODUCTS
export const requestAllProducts = async (): Promise<IProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.PRODUCTS}`, { withCredentials: true }).then((response: AxiosResponse) => response.data.payload[0]);
}
export const requestAddProduct = async (product: IProduct): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.PRODUCTS}`, product, { withCredentials: true }).then((response) => response.data.payload);
}
export const requestUpdateProduct = async (product: IProduct): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.PRODUCTS}`, product, { withCredentials: true }).then((response) => response.data.payload[0]);
}
export const requestDeleteProduct = async (id: number): Promise<any> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.PRODUCTS}/${id}`, { withCredentials: true }).then((response) => response.data.payload[0]);
}

// INVENTORY
export const requestAllInventoryByProductID = async (id: number): Promise<IInventory[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.INVENTORY}/product/${id}`, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}
export const requestUpdateInventory = async (inventory: IInventory): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.INVENTORY}`, inventory, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}
export const requestUpdateMultipleInventory = async (inventory: IInventory[]): Promise<any> => {
    axios.put(`${BASE_API_URL}${ROUTES.INVENTORY}/multiple`, inventory, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}
export const requestAddInventory = async (inventory: IInventory): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.INVENTORY}`, inventory, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestAddMultipleInventory = async (inventory: IInventory[]): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.INVENTORY}/multiple`, inventory, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestAddMultipleInventoryReceiving = async (inventory: IInventory[], receivedItemId: number): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.INVENTORY}/receiving/multiple`, {inventory, receivedItemId}, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestRemoveInventory = async (inventoryList: IInventory[]): Promise<any> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.INVENTORY}`, { withCredentials: true, data: inventoryList }).then((response) => response?.data?.payload[0]);
}

// COMPANY
export const requestAllCompanies = async (): Promise<ICompany[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.COMPANY}`, { withCredentials: true }).then((response) => response.data.payload[0]);
}
export const requestAddCompany = async (company: ICompany): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.COMPANY}`, company, { withCredentials: true }).then((response) => response.data.payload);
}
export const requestUpdateCompany = async (company: ICompany): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.COMPANY}`, company, { withCredentials: true }).then((response) => response.data.payload[0]);
}
export const requestDeleteCompany = async (id: number): Promise<any> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.COMPANY}/${id}`, { withCredentials: true }).then((response) => response.data.payload[0]);
}

// QUOTES
export const requestAllQuotesByCompanyID = async (companyId: number): Promise<IQuote[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTE}/${ROUTES.COMPANY}/${companyId}`, { withCredentials: true }).then((response) => response.data.payload[0]);
};
export const requestAddQuote = async (quote: IQuote): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.QUOTE}`, quote, { withCredentials: true }).then((response) => response.data.payload);
}
export const requestUpdateQuoteAndQuotedProducts = async (quote: IQuote): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.QUOTE}/${ROUTES.QUOTED_PRODUCTS}`, quote, { withCredentials: true }).then((response) => response.data.payload[0]);
}
export const requestDeleteQuote = async (id: number): Promise<any> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.QUOTE}/${id}`, { withCredentials: true }).then((response) => response.data.payload[0]);
}
export const requestAllProductQuotesByQuoteId = async (quoteId: number): Promise<IQuotedProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}/${ROUTES.QUOTE}/${quoteId}`, { withCredentials: true }).then((response) => response.data.payload[0]);
}

// QUOTED PRODUCTS
export const requestAddQuotedProduct = async (quotedProduct: IQuotedProduct): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}`, quotedProduct, { withCredentials: true }).then((response) => response.data.payload);
}
export const requestGetQuotedProductsByQuoteId = async (quoteId: number): Promise<IQuotedProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}/quote/${quoteId}`, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}
export const requestAllQuotesByProductId = async (productId: number): Promise<IQuotedProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}/product/${productId}`, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}

// REMOVED INVENTORY
export const requestAddRemovedInventory = async (removedInventory: IRemovedInventory): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.REMOVED_INVENTORY}`, removedInventory, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}

// Receiving
export const RequestAddReceivingOrder = async (receiving: IReceiving): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.RECEIVING}`, receiving, { withCredentials: true });
};
export const requestAllReceiving = async (): Promise<IReceiving[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.RECEIVING}`, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}
export const RequestUpdateReceivingOrder = async (receiving: IReceiving): Promise<number> => {
    return axios.put(`${BASE_API_URL}${ROUTES.RECEIVING}`, receiving, { withCredentials: true });
};
export const RequestDeleteReceivingOrder = async (receiving: IReceiving): Promise<void> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.RECEIVING}/${receiving.id}`, { withCredentials: true });
};

// Received Items
export const requestAllReceivedItems = async (receivingId: number): Promise<IReceivedItem[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.RECEIVED_ITEM}/receiving/${receivingId}`, { withCredentials: true }).then((response) => response?.data?.payload[0]);
}
export const requestAddReceivedItems = async (receivedItems: IReceivedItem[]): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.RECEIVED_ITEM}/multiple`, receivedItems, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestEditReceivedItem = async (receivedItem: IReceivedItem): Promise<number> => {
    return axios.put(`${BASE_API_URL}${ROUTES.RECEIVED_ITEM}`, receivedItem, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestRemoveReceivedItem = async (id: number): Promise<void> => {
    axios.delete(`${BASE_API_URL}${ROUTES.RECEIVED_ITEM}/${id}`, { withCredentials: true }).then((response) => response);
}