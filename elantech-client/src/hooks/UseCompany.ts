import { useState, useEffect, useCallback } from 'react';
import { requestAllCompanies } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import ICompany from '../types/ICompany';
import { defaultAlert } from '../constants/Defaults';
import IAlert from '../types/IAlert';

export const UseCompany = () => {
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [alert, setAlert] = useState<IAlert>(defaultAlert);

    const fetchCompanies = useCallback(async () => {
        try {
            const fetchedCompanies = await requestAllCompanies();
            setCompanies(fetchedCompanies);
            setAlert({ ...alert, label: 'Table has been updated', type: 'success', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 3000);
        } catch (error) {
            setAlert({ ...alert, label: `${error}`, show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 3000);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();

        SocketService.connect();
        SocketService.on('product.updated', fetchCompanies);

        return () => SocketService.off('product.updated', fetchCompanies);
    }, [fetchCompanies]);

    return { companies, alert, fetchCompanies };
};
