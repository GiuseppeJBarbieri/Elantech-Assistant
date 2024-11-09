import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

interface TopHomeBarProps extends React.HTMLAttributes<HTMLDivElement> {
    logout: () => void;
    setAddProductSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopHomeBarComponent: React.FunctionComponent<TopHomeBarProps> = (props) => {

    return (
        <div className='d-flex justify-content-between'>
            <h2 style={{ fontWeight: 300 }}>Products</h2>
            <div>
                <Button variant="dark" style={{ marginRight: 5 }}>Export to CSV</Button>
                <Button variant="dark" style={{ marginRight: 5 }} onClick={() => { props.setAddProductSwitch(true) }}>
                    <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />New Product
                </Button>
                <Button variant="dark" style={{ marginRight: 5 }} onClick={() => props.logout()}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default TopHomeBarComponent;