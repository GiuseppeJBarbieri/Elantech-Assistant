import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Button, Fade, Spinner } from 'react-bootstrap';
import { DriverTable } from '../../components/DriverTable/DriverTable';
import { BASE_API_URL } from '../../constants/API';
import IDriver from '../../types/IDriver';
import axios from 'axios';
import './Drivers.css';

interface DriversProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const DriversLayout: FunctionComponent<DriversProps> = ({ history }) => {
  const [driverTableState, setDriverTableState] = useState<{ data: IDriver[], isPending: boolean }>({ data: [], isPending: true });
  const [actionRowVisible, setActionRowVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [driver, setDriver] = useState<IDriver>({ driverId: 0, name: '' });

  const addDriver = () => {
    setIsSaving(true);
    setTimeout(() => {
      const _driver = {...driver};
      delete _driver.driverId;
      axios.post(`${BASE_API_URL}drivers`, _driver, { withCredentials: true })
        .then((response) => {
          getDrivers();
          setDriver({ driverId: 0, name: '' });
        })
        .catch((err) => {
          console.log(err);
          setIsSaving(false);
        });
    }, 400);
  };

  const getDrivers = () => {
    setTimeout(() => {
      axios.get(`${BASE_API_URL}drivers`, { withCredentials: true })
        .then((response) => {
          setDriverTableState({ data: response?.data?.payload, isPending: false });
          setIsSaving(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 400);
  };

  const onDriverRemoved = (driverId: number) => {
    setIsSaving(true);
    setTimeout(() => {
      axios.delete(`${BASE_API_URL}drivers/${driverId}`, { withCredentials: true })
        .then((response) => {
          getDrivers();
          setIsSaving(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 400);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h1 style={{ fontWeight: 300 }}>Time Frame Assistant</h1>
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 300 }}>Drivers</h2>
          <span style={{ marginLeft: '10px' }} />

          <Button
            className='btn btn-dark'
            style={{ height: 38 }}
            onClick={() => setActionRowVisible(!actionRowVisible)}
            aria-controls="collapse-btns"
            aria-expanded={actionRowVisible}
          >
            Add Driver
          </Button>
          <Fade in={actionRowVisible}>
            <div id="example-fade-text flex">
              <form className='container d-flex' style={{ 'maxWidth': 400 }}>
                <input type='text' 
                className="form-control custom-input" 
                placeholder="Driver Name" 
                value={driver.name} onChange={(e) => setDriver({ ...driver, name: e.target.value })} 
                />
                <Button
                  className='btn btn-dark'
                  style={{ height: 38, marginLeft: 5 }}
                  aria-controls="collapse-btns"
                  aria-expanded={actionRowVisible}
                  onClick={async () => {
                    setActionRowVisible(!actionRowVisible)
                    addDriver()
                  }}
                >
                  Add
                </Button>
              </form>
            </div>
          </Fade>
        </div>
        <br />
        <div style={{ marginTop: -30 }} >
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
            <DriverTable data={driverTableState.data} isPending={driverTableState.isPending} onDriverRemoved={onDriverRemoved} />
          }
        </div>
      </div>
    </section>

  );
};

export const Drivers = withRouter(DriversLayout);
