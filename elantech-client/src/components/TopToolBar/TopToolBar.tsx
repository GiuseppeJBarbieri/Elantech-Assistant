import React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { List } from 'react-bootstrap-icons';
import './TopToolBar.css';

interface TopToolBarProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopToolBarComponent: FunctionComponent<TopToolBarProps> = ({ setPanelVisible }) => {
  return (
    <div className="tool-bar-div TopToolBar bg-dark d-flex justify-content-start" style={{padding: 5}}>
      <button className="btn btn-dark" type="button" onClick={() => setPanelVisible(true)} >
        <List className="tool-bar-icon bi me-2" width="40" height="32" />
      </button>
    </div>
  );
};

export const TopToolBar = withRouter(TopToolBarComponent);
