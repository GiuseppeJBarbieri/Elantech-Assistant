import { useState, useEffect, useCallback } from 'react';
import { requestAllProducts } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import IProduct from '../types/IProduct';
import { defaultAlert } from '../constants/Defaults';
import IAlert from '../types/IAlert';

export const UseProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [alert, setAlert] = useState<IAlert>(defaultAlert);

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await requestAllProducts();
      setProducts(fetchedProducts);
      setAlert((prev) => ({ ...prev, label: 'Table has been updated', type: 'success', show: true }));
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
    } catch (error) {
      setAlert((prev) => ({ ...prev, label: `Failed to fetch expanded row data: ${error}`, show: true, type: 'danger' }));
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    SocketService.connect();
    SocketService.on('product.updated', fetchProducts);

    return () => SocketService.off('product.updated', fetchProducts);
  }, [fetchProducts]);

  return { products, alert, fetchProducts };
};
