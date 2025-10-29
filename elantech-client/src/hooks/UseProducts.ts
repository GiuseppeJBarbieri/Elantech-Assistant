import { useState, useEffect, useCallback } from 'react';
import { requestAllProducts } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import IProduct from '../types/IProduct';
import { defaultAlert } from '../constants/Defaults';
import IAlert from '../types/IAlert';

export const UseProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [alert, setAlert] = useState<IAlert>(defaultAlert);

  // Add these useState hooks for FloatingAlert
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Add handler for closing the alert
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await requestAllProducts();
      setProducts(fetchedProducts);

      setAlertMessage('Table has been updated');
      setAlertType('success');
      setShowAlert(true);

      setAlert((prev) => ({ ...prev, label: 'Table has been updated', type: 'success', show: true }));
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
    } catch (error) {
      setAlertMessage(`Failed to fetch expanded row data: ${error}`);
      setAlertType('warning');
      setShowAlert(true);

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

  return { products, showAlert, alertType, alertMessage, handleAlertClose, fetchProducts };
};
