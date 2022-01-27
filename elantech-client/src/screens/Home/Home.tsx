import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Form, Button, Fade } from 'react-bootstrap';
import { TimeFrameTable } from '../../components/TimeFrameTable/TimeFrameTable';
import { BASE_API_URL } from '../../constants/API';
import IDriver from '../../types/IDriver';
import moment from 'moment';
import axios from 'axios';
import './Home.css';
import ITimeFrame from '../../types/ITimeFrame';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const HomeLayout: FunctionComponent<HomeProps> = ({ history }) => {

  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [driverTableState, setDriverTableState] = useState<{ data: IDriver[], isPending: boolean }>({ data: [], isPending: true });
  const [openEmailBtns, setOpenEmailBtns] = useState(false);

  /**
   * Time Frame List for expanded row table
   */
  const [timeFrameList, setTimeFrameList] = useState<ITimeFrame[]>([]);
  /**
   * If a row is expanded, this will help refresh the nested table when the date is changed
   */
  const [lastSelectedDriver, setLastSelectedDriver] = useState(0);

  const [isNestedTableLoading, setIsNestedTableLoading] = useState(false);

  const getTimeFrames = (driverId: number, orderDate: Date) => {
    setIsNestedTableLoading(true);
    setTimeout(() => {
      const payload = { orderDate: orderDate, driverId: driverId };
      setLastSelectedDriver(driverId);
      axios.post(`${BASE_API_URL}/timeFrames/ByOrderDate`, payload, { withCredentials: true })
        .then((response) => {
          setTimeFrameList(response?.data?.payload);
          setIsNestedTableLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsNestedTableLoading(false);
        });
    }, 400);
  };

  const showEmailScreen = () => {

  }
  const getDrivers = () => {
    setDriverTableState({ ...driverTableState, isPending: true });
    setTimeout(() => {
      axios.get(`${BASE_API_URL}drivers`, { withCredentials: true })
        .then((response) => {
          setDriverTableState({ data: response?.data?.payload, isPending: false });
        })
        .catch((err) => {
          console.log(err);
          setDriverTableState({ ...driverTableState, isPending: false });
        });
    }, 400);
  };

  useEffect(() => {
    getDrivers();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h1 style={{ fontWeight: 300 }}>Time Frame Assistant</h1>
          <Form.Group controlId="dob">
            <Form.Control
              style={{ textAlign: 'center' }}
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(moment(e.target.value).format("YYYY-MM-DD"));
                getTimeFrames(lastSelectedDriver, new Date(moment(e.target.value).toString()));
              }}
            />
          </Form.Group>
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 300 }}>Time Frames</h2>
          <span style={{ marginLeft: '10px' }} />
          <Button
            className='btn btn-dark'
            style={{ height: 38 }}
            onClick={() => setOpenEmailBtns(!openEmailBtns)}
            aria-controls="collapse-btns"
            aria-expanded={openEmailBtns}
          >
            Email
          </Button>
          <Fade in={openEmailBtns}>
            <div id="example-fade-text">
              <Button
                style={{ marginLeft: 10 }}
                className='btn btn-dark'
                onClick={() => {
                  showEmailScreen();
                  setOpenEmailBtns(!openEmailBtns);
                }}
              >
                Store
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                className='btn btn-dark'
                onClick={() => setOpenEmailBtns(!openEmailBtns)}

              >
                All Stores
              </Button>
            </div>
          </Fade>
        </div>
        <br />
        <div style={{ marginTop: -30 }} >
          <TimeFrameTable
            data={driverTableState.data}
            isPending={driverTableState.isPending}
            selectedDate={selectedDate}
            timeFrameList={timeFrameList}
            isNestedTableLoading={isNestedTableLoading}
            getTimeFrames={getTimeFrames}
          />
        </div>
      </div>
    </section>

  );
};

export const Home = withRouter(HomeLayout);
