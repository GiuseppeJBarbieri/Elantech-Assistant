import IProduct from './IProduct';

interface ISelectedProductListReceivedOrder {
    quantity: number,
    condition: string,
    product: IProduct,
    comments: string,
}
export default ISelectedProductListReceivedOrder;
