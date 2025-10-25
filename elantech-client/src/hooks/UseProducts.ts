import { useState, useEffect, useCallback } from 'react';
import { requestAllProducts } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import IProduct from '../types/IProduct';
import { defaultAlert } from '../constants/Defaults';

export const UseProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [alert, setAlert] = useState(defaultAlert);

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await requestAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      setAlert({ ...alert, label: `${error}`, show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    } finally {
      setAlert({ ...alert, label: 'Table has been updated', type: 'success', show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    SocketService.connect();
    SocketService.on('product.updated', fetchProducts);

    return () => SocketService.off('product.updated', fetchProducts);
  }, [fetchProducts]);

  return { products, alert, refetchProducts: fetchProducts };
};
