import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Button, Fade, Spinner } from 'react-bootstrap';
import { StoreTable } from '../../components/StoreTable/StoreTable';
import { BASE_API_URL } from '../../constants/API';
import axios from 'axios';
import IStore from '../../types/IStore';

import './Email.css'
interface EmailProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const EmailLayout: FunctionComponent<EmailProps> = ({ history }) => {
  const [storeTableState, setStoreTableState] = useState<{ data: IStore[], isPending: boolean }>({ data: [], isPending: true });
  const [open, setOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [store, setStore] = useState<IStore>({ storeId: 0, storeName: '', emailAddress: '' });

  const getStores = () => {
    setIsSaving(true);
    setTimeout(() => {
      axios.get(`${BASE_API_URL}stores`, { withCredentials: true })
        .then((response) => {
          setStoreTableState({ data: response?.data?.payload, isPending: false });
          setIsSaving(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 400);
  };
  
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div>
          <h1 style={{ fontWeight: 300, marginBottom: 0 }}>Time Frame Assistant</h1>
          <br />
        </div>
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 300 }}>Stores</h2>
          <span style={{ marginLeft: '10px' }} />
          <Button
            className='btn btn-dark'
            style={{ height: 38 }}
            onClick={() => setOpen(!open)}
            aria-controls="collapse-btns"
            aria-expanded={open}
          >
            Email Selected Stores
          </Button>
        </div>
        <br />
        {isSaving ?
          <div className='spinnerDiv' >
            <ul>
              <li key='1' style={{ listStyle: 'none' }}>
                <Spinner animation="border" role="status" />
              </li>
              <li key='2' style={{ listStyle: 'none' }}>
                <label>Loading...</label>
              </li>
            </ul>
          </div>
          :
          <div style={{ marginTop: -30 }} >
            <StoreTable data={storeTableState.data} isPending={storeTableState.isPending} onStoreRemoved={{onStoreRemoved}} />
          </div>
        }

      </div>
    </section >
  );
};

export const Email = withRouter(EmailLayout);
