import { useState, useEffect, useCallback } from 'react';
import { requestAllReceiving } from '../utils/Requests';
import SocketService from '../utils/SocketService';
import IReceiving from '../types/IReceiving';
import { defaultAlert } from '../constants/Defaults';
import IAlert from '../types/IAlert';

export const UseReceiving = () => {
    const [receivingList, setReceivingList] = useState<IReceiving[]>([]);
    const [alert, setAlert] = useState<IAlert>(defaultAlert);

    const fetchReceiving = useCallback(async () => {
        try {
            const fetchedReceiving = await requestAllReceiving();
            setReceivingList(fetchedReceiving);
            setAlert({ ...alert, label: 'Table has been updated', type: 'success', show: true });
            setTimeout(() => setAlert({ ...alert, show: false }), 3000);
        } catch (error) {
            setAlert({ ...alert, label: `${error}`, show: true, type: 'danger' });
            setTimeout(() => setAlert({ ...alert, show: false }), 3000);
        }
    }, []);

    useEffect(() => {
        fetchReceiving();

        SocketService.connect();
        SocketService.on('receiving.updated', fetchReceiving);

        return () => SocketService.off('receiving.updated', fetchReceiving);
    }, [fetchReceiving]);

    return { receivingList, alert, fetchReceiving };
};
