import { useState, useEffect, useCallback } from 'react';
import { requestAllProducts } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import IProduct from '../types/IProduct';

export const UseProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedProducts = await requestAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Optionally set an error state here
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    SocketService.connect();
    SocketService.on('product.updated', fetchProducts);

    return () => SocketService.off('product.updated', fetchProducts);
  }, [fetchProducts]);

  return { products, isLoading, refetchProducts: fetchProducts };
};
