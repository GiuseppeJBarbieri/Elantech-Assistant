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
    return axios.get(`${BASE_API_URL}${ROUTES.PRODUCTS}`, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestAddProduct = async (product: IProduct): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.PRODUCTS}`, product, { withCredentials: true }).then((response) => response);
}
export const requestUpdateProduct = async (product: IProduct): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.PRODUCTS}`, product, { withCredentials: true }).then((response) => response);
}
export const requestDeleteProduct = async (id: number): Promise<any> => {
    axios.delete(`${BASE_API_URL}${ROUTES.PRODUCTS}/${id}`, { withCredentials: true }).then((response) => response);
}

// INVENTORY
export const requestAllInventoryByProductID = async (productId: number): Promise<IInventory[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.INVENTORY}/${productId}`, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestUpdateInventory = async (inventory: IInventory): Promise<any> => {
    axios.put(`${BASE_API_URL}${ROUTES.INVENTORY}`, inventory, { withCredentials: true }).then((response) => response);
}
export const requestUpdateMultipleInventory = async (inventory: IInventory[]): Promise<any> => {
    axios.put(`${BASE_API_URL}${ROUTES.INVENTORY}/multiple`, inventory, { withCredentials: true }).then((response) => response);
}
export const requestAddInventory = async (inventory: IInventory): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.INVENTORY}`, inventory, { withCredentials: true }).then((response) => response);
}
export const requestRemoveInventory = async (inventory: IInventory): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.INVENTORY}/removal`, inventory, { withCredentials: true }).then((response) => response);
}

// COMPANY
export const requestAllCompanies = async (): Promise<ICompany[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.COMPANY}`, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestAddCompany = async (company: ICompany): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.COMPANY}`, company, { withCredentials: true }).then((response) => response);
}
export const requestUpdateCompany = async (company: ICompany): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.COMPANY}`, company, { withCredentials: true }).then((response) => response);
}
export const requestDeleteCompany = async (id: number): Promise<any> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.COMPANY}/${id}`, { withCredentials: true }).then((response) => response);
}

// Product Quotes
export const requestAllProductQuotes = async (): Promise<any> => {
    return undefined;
}
export const requestAllProductQuotesByQuoteId = async (quoteId: number): Promise<IQuotedProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}/${ROUTES.QUOTE}/${ROUTES.QUOTED_PRODUCTS}/${quoteId}`, { withCredentials: true }).then((response) => response?.data?.payload);
}

// QUOTES
export const requestAllQuotesByCompanyID = async (companyId: number): Promise<IQuote[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTE}/${ROUTES.COMPANY}/${companyId}`, { withCredentials: true }).then((response) => response?.data?.payload);
};
export const requestAddQuote = async (quote: IQuote): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.QUOTE}`, quote, { withCredentials: true }).then((response) => response);
}
export const requestUpdateQuoteAndQuotedProducts = async (quote: IQuote): Promise<any> => {
    return axios.put(`${BASE_API_URL}${ROUTES.QUOTE}/${ROUTES.QUOTED_PRODUCTS}`, quote, { withCredentials: true }).then((response) => response);
}
export const requestDeleteQuote = async (id: number): Promise<any> => {
    return axios.delete(`${BASE_API_URL}${ROUTES.QUOTE}/${id}`, { withCredentials: true }).then((response) => response);
}

// QUOTED PRODUCTS
export const requestAddQuotedProduct = async (quotedProduct: IQuotedProduct): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}`, quotedProduct, { withCredentials: true }).then((response) => response);
}
export const requestGetQuotedProductsByQuoteId = async (quoteId: number): Promise<IQuotedProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}/quote/${quoteId}`, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestAllQuotesByProductId = async (productId: number): Promise<IQuotedProduct[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.QUOTED_PRODUCTS}/quote/quotedProduct/product/${productId}`, { withCredentials: true }).then((response) => response?.data?.payload);
}

// REMOVED INVENTORY
export const requestAddRemovedInventory = async (removedInventory: IRemovedInventory): Promise<any> => {
    return axios.post(`${BASE_API_URL}${ROUTES.REMOVED_INVENTORY}`, removedInventory, { withCredentials: true }).then((response) => response);
}

// Receiving
export const RequestAddReceivingOrder = async (receiving: IReceiving): Promise<any> => {
    await axios.post(`${BASE_API_URL}${ROUTES.RECEIVING}`, receiving, { withCredentials: true });
};
export const requestAllReceiving = async (): Promise<IReceiving[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.RECEIVING}`, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const RequestUpdateReceivingOrder = async (receiving: IReceiving): Promise<number> => {
    return await axios.put(`${BASE_API_URL}${ROUTES.RECEIVING}`, receiving, { withCredentials: true });
};
export const RequestDeleteReceivingOrder = async (receiving: IReceiving): Promise<void> => {
    await axios.delete(`${BASE_API_URL}${ROUTES.RECEIVING}/${receiving.id}`, { withCredentials: true });
};

// Received Items
export const requestAllReceivedItems = async (receivingId: number): Promise<IReceivedItem[]> => {
    return axios.get(`${BASE_API_URL}${ROUTES.RECEIVED_ITEM}/receiving/${receivingId}`, { withCredentials: true }).then((response) => response?.data?.payload);
}
export const requestEditReceivedItem = async (receivedItem: IReceivedItem): Promise<number> => {
    return axios.put(`${BASE_API_URL}${ROUTES.RECEIVED_ITEM}`, receivedItem, { withCredentials: true }).then((response) => response?.data?.payload);
}
