import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import SlidingPane from 'react-sliding-pane';
import { HouseDoor, Shop, ArrowBarLeft, CartPlus, Truck, Gear } from 'react-bootstrap-icons';
import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { useNavigate } from 'react-router-dom';
import './SideNavBar.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

/**
 * Properties for SideNavBar Component
 */
interface SideNavBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Getter - Switch to display/not display side navigation bar
   */
  panelVisible: boolean;
  /**
   * Setter - See panelVisible
   */
  setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNavBarComponent: FunctionComponent<SideNavBarProps> = (props: SideNavBarProps) => {
  const navigate = useNavigate();
  return (
    <SlidingPane
      hideHeader
      isOpen={props.panelVisible}
      from="left"
      width="250px"
      className='bg-dark'
      onRequestClose={() => props.setPanelVisible(false)}
    >
      <div className="text-white bg-dark" >
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <ArrowBarLeft className="arrowBarLeftPointer bi me-2"
            width="40" height="32" onClick={() => props.setPanelVisible(false)}
          />
          <h1 className='font-weight-300' style={{ marginBottom: 0 }}>Menu</h1>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); navigate(PAGE_ROUTES.LOGIN, { replace: true }) }}>
              <HouseDoor className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 2 }}>Home</h4>
            </div>
          </li>
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); navigate(PAGE_ROUTES.QUOTES, { replace: true }) }}>
              <Shop className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Quotes</h4>
            </div>
          </li>
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); navigate(PAGE_ROUTES.RECEIVING, { replace: true }) }}>
              <Truck className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Receiving</h4>
            </div>
          </li>
          {/* <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); props.history.replace(PAGE_ROUTES.OUTGOING) }}>
              <CartPlus className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Outgoing</h4>
            </div>
          </li> */}
          {/* <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); props.history.replace(PAGE_ROUTES.PROCUREMENT) }}>
              <CartPlus className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Procurement</h4>
            </div>
          </li> */}
          {/* <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); props.history.replace(PAGE_ROUTES.RECEIVING) }}>
              <CartPlus className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Broker Bin</h4>
            </div>
          </li> */}
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); navigate(PAGE_ROUTES.PROCUREMENT, { replace: true }) }}>
              <CartPlus className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Removed</h4>
            </div>
          </li>
          {/* <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); props.history.replace(PAGE_ROUTES.PROCUREMENT) }}>
              <CartPlus className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Completed Orders</h4>
            </div>
          </li>
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); props.history.replace(PAGE_ROUTES.PROCUREMENT) }}>
              <CartPlus className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Current Orders</h4>
            </div>
          </li> */}
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { props.setPanelVisible(false); navigate(PAGE_ROUTES.SETTINGS, { replace: true }) }}>
              <Gear className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 className='font-weight-300' style={{ marginTop: 3 }}>Settings</h4>
            </div>
          </li>
        </ul>
        <div style={{ 'bottom': '0', 'position': 'absolute', 'width': '75%' }}>
          <hr />
          <p className='font-weight-300' style={{}}>by Giuseppe Barbieri</p>
        </div>
      </div>
    </SlidingPane >
  );
};

export default SideNavBarComponent;
