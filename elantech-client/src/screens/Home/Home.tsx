import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Accordion, Button, Collapse, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Home.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';
import { AddProductModal } from '../../components/AddProductModal/AddProductModal';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const HomeLayout: FunctionComponent<HomeProps> = ({ history }) => {
  const [addProductSwitch, setAddProductSwitch] = useState(false);
  const rankFormatterEdit = (_: any, data: any, index: any) => {
    return (
      <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }}
        onClick={() => {
          console.log('Edit Column')
        }} >
        <Pencil style={{ fontSize: 20, color: 'white' }} />
      </div>
    );
  };

  const rankFormatterRemove = (_: any, data: any, index: any) => {
    return (
      <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => console.log('Remove Column')} >
        <Trash style={{ fontSize: 20, color: 'white' }} />
      </div>
    );
  };

  const rankFormatterAdd = (_: any, data: any, index: any) => {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal',
          zIndex: 0
        }}
        onClick={(e) => { e.stopPropagation() }}
      >
        <div onClick={(e) => {
          console.log('add');
        }}
        >
          <Plus
            style={{ fontSize: 20, color: 'white' }}
          />
        </div>
      </div>
    );
  };

  const column = [
    {
      id: 1,
      dataField: "quantity",
      text: "Qty",
      sort: false,
      headerAlign: 'center',
      style: {
        textAlign: 'center',
      }
    },
    {
      id: 2,
      dataField: "product_number",
      text: "Product Number",
      sort: true,
    },
    {
      id: 7,
      dataField: "product_type",
      text: "Type",
      sort: false,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 8,
      dataField: "brand",
      text: "Brand",
      sort: false,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 9,
      dataField: "description",
      text: "Description",
      sort: false,
    },
    {
      id: 12,
      dataField: "last_added",
      text: "Last Added",
      sort: false,
    },
    {
      id: 3,
      dataField: "addTimeFrame",
      text: "Add",
      sort: false,
      formatter: rankFormatterAdd,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 10,
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: rankFormatterEdit,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 11,
      dataField: "remove",
      text: "Remove",
      sort: false,
      formatter: rankFormatterRemove,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    }

  ];
  const fake_data = [
    {
      quantity: 130,
      product_number: '826701-B21826701-B21826701-B2112345',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B22',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser DL38x Gen10 2x8 x16 PCIe M.2 Riser DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B23',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B24',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B25',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B26',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B27',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B28',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B29',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B30',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B31',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B32',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B33',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B34',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B35',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B36',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B37',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B38',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B39',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B40',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B41',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B42',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B43',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B44',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B45',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B46',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B47',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B48',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B49',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B50',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B51',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    },
    {
      quantity: 130,
      product_number: '826701-B52',
      alternate_number_one: '877946-001',
      alternate_number_two: '809461-001',
      alternate_number_three: '875056-001',
      alternate_number_four: '871820-001',
      product_type: 'Riser',
      brand: 'HPE',
      description: 'DL38x Gen10 2x8 x16 PCIe M.2 Riser',
      last_added: '2021-01-29',
    }
  ];
  const options = {
    custom: true,
    totalSize: fake_data.length
  };
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h1 style={{ fontWeight: 300 }}>Products</h1>
          <div>
            <Button variant="dark" size='lg' style={{ marginRight: 5 }}>Export to Excel</Button>
            <Button variant="dark" size='lg' onClick={() => {setAddProductSwitch(true)}}
            >
            <Plus height="25" width="25" />New Product
          </Button>
        </div>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <input type='text'
          className="form-control custom-input"
          placeholder="Search Product"
          style={{ width: 200 }}
        />
        <div className='d-flex'>
          <DropdownButton
            variant="dark"
            menuVariant="dark"
            title={'Filter Products'}
            style={{ marginRight: 5 }}
          >
            <Dropdown.Item eventKey="1">CPU</Dropdown.Item>
            <Dropdown.Item eventKey="2">Memory</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>SSD</Dropdown.Item>
            <Dropdown.Item eventKey="4">HDD</Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            key={'dark'}
            variant="dark"
            menuVariant="dark"
            title={'Search History'}
          >
            <Dropdown.Item eventKey="1">---------</Dropdown.Item>
            <Dropdown.Item eventKey="2">---------</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>---------</Dropdown.Item>
            <Dropdown.Item eventKey="4">---------</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <br />
      <div>
        <PaginationProvider
          pagination={paginationFactory(options)}
        >
          {
            ({
              paginationProps,
              paginationTableProps
            }) => (
              <div>
                <BootstrapTable
                  key='product_table'
                  {...paginationTableProps}
                  keyField="product_number"
                  bootstrap4
                  data={fake_data}
                  columns={column}
                  classes="table table-dark table-hover table-striped table-responsive"
                  noDataIndication="Table is Empty"
                  expandRow={{
                    onlyOneExpanding: true,
                    renderer: (row, index) => {
                      return (
                        <ExpandedProductRow />
                      )
                    }
                  }}
                />
                <div className='d-flex justify-content-between'>
                  <SizePerPageDropdownStandalone
                    {...paginationProps}
                  />
                  <PaginationListStandalone
                    {...paginationProps}
                  />
                </div>
              </div>
            )
          }
        </PaginationProvider>
      </div>
    </div>
    {
        addProductSwitch &&
        <div className='modal-dialog'>
          <AddProductModal
            modalVisible={addProductSwitch}
            onClose={async () => {
              setAddProductSwitch(false);
            }} 
            />
        </div>
      }
    </section >
  );
};

export const Home = withRouter(HomeLayout);
