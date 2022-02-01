import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Accordion, Button, Collapse, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Home.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const HomeLayout: FunctionComponent<HomeProps> = ({ history }) => {

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
  const column_inner = [
    {
      id: 1,
      dataField: "serial_number",
      text: "Serial Number",
      sort: false,
    },
    {
      id: 2,
      dataField: "product_condition",
      text: "Condition",
      sort: true,
    },
    {
      id: 3,
      dataField: "seller_name",
      text: "Seller Name",
      sort: true
    },
    {
      id: 4,
      dataField: "order_number",
      text: "Order Number",
      sort: false,
    }
    ,
    {
      id: 5,
      dataField: "date_received",
      text: "Date Received",
      sort: false,
    }
    ,
    {
      id: 6,
      dataField: "warranty_expiration",
      text: "Warranty Expiration",
      sort: false,
    },
    {
      id: 8,
      dataField: "comment",
      text: "Comment",
      sort: false,
    },
    {
      id: 9,
      dataField: "location",
      text: "Location",
      sort: false,
    },
    {
      id: 7,
      dataField: "tested",
      text: "Tested",
      sort: false,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 10,
      dataField: "reserved",
      text: "Reserved",
      sort: false,
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
  const fake_data_inner = [
    {
      serial_number: 'serial-number-1',
      product_condition: 'condition',
      seller_name: 'Ebay',
      order_number: '809461-001',
      date_received: '2021-01-29',
      warranty_expiration: '2021-01-29',
      tested: 'Yes',
      comment: 'N/A',
      location: 'Aisle 4 Row 2',
      reserved: 'No'
    },
    {
      serial_number: 'serial-number-2',
      product_condition: 'condition',
      seller_name: 'Ebay',
      order_number: '809461-001',
      date_received: '2021-01-29',
      warranty_expiration: '2021-01-29',
      tested: 'Yes',
      comment: 'N/A',
      location: 'Aisle 4 Row 2',
      reserved: 'No'
    },
    {
      serial_number: 'serial-number-3',
      product_condition: 'condition',
      seller_name: 'Ebay',
      order_number: '809461-001',
      date_received: '2021-01-29',
      warranty_expiration: '2021-01-29',
      tested: 'Yes',
      comment: 'N/A',
      location: 'Aisle 4 Row 2',
      reserved: 'No'
    },
    {
      serial_number: 'serial-number-4',
      product_condition: 'condition',
      seller_name: 'Ebay',
      order_number: '809461-001',
      date_received: '2021-01-29',
      warranty_expiration: '2021-01-29',
      tested: 'Yes',
      comment: 'N/A',
      location: 'Aisle 4 Row 2',
      reserved: 'No'
    },
    {
      serial_number: 'serial-number-5',
      product_condition: 'condition',
      seller_name: 'Ebay',
      order_number: '809461-001',
      date_received: '2021-01-29',
      warranty_expiration: '2021-01-29',
      tested: 'Yes',
      comment: 'N/A',
      location: 'Aisle 4 Row 2',
      reserved: 'No'
    },
    {
      serial_number: 'serial-number-6',
      product_condition: 'condition',
      seller_name: 'Ebay',
      order_number: '809461-001',
      date_received: '2021-01-29',
      warranty_expiration: '2021-01-29',
      tested: 'Yes',
      comment: 'N/A',
      location: 'Aisle 4 Row 2',
      reserved: 'No'
    },
  ];
  const [open, setOpen] = useState(false);

  const options = {
    custom: true,
    totalSize: fake_data.length
  };
  const options2 = {
    custom: true,
    sizePerPage: 5,
    totalSize: fake_data_inner.length
  };

  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h1 style={{ fontWeight: 300 }}>Products</h1>
          <div>
            <Button variant="dark" size='lg' style={{ marginRight: 5 }}>Export to Excel</Button>
            <Button variant="dark" size='lg'><Plus height="25" width="25" />New Product</Button>
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
                          <div style={{ padding: 20 }} className='expandedProductRow'>
                            <Navbar bg="dark" variant="dark">
                              <Navbar.Brand>More Info</Navbar.Brand>
                              <Nav className="me-auto">
                                <Nav.Link href="#home">Ebay Listing</Nav.Link>
                                <Nav.Link href="#features">Website Listing</Nav.Link>
                                <Nav.Link href="#pricing">HPE Quick Specs</Nav.Link>
                                <Nav.Link href="#pricing">Quick Quote</Nav.Link>
                              </Nav>
                            </Navbar>
                            <hr />
                            <div className='d-flex justify-content-between' style={{ paddingLeft: 15, paddingRight: 15 }}>
                              <p>New Opened Box: 6</p>
                              <p>Factory Sealed: 5</p>
                              <p>Refurbished: 3</p>
                              <p>Renew: 2</p>
                              <p>Used: 2</p>
                              <p>Reserved: 2</p>
                              <p>Damaged: 2</p>
                            </ div>
                            <hr />
                            <div className='d-flex' style={{ padding: 20 }}>
                              <div style={{ marginRight: 50 }}>
                                <p><strong style={{ fontWeight: 500 }}>Product Number : </strong>&emsp;&ensp;&nbsp;Example-b21</p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 1:</strong>&emsp;Example-b21</p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 2:</strong>&emsp;Example-b21</p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 3:</strong>&emsp;Example-b21</p>
                                <p><strong style={{ fontWeight: 500 }}>Alternate Number 4:</strong>&emsp;Example-b21</p>
                              </ div>
                              <div style={{ marginRight: 50 }}>
                                <p><strong style={{ fontWeight: 500 }}>Average Quote:</strong>&emsp;&emsp;&emsp; $210.00</p>
                                <p><strong style={{ fontWeight: 500 }}>Last Quoted Price:</strong>&emsp; $200.00</p>
                                <p><strong style={{ fontWeight: 500 }}>Quoted By:</strong>&emsp;&emsp;&emsp;&emsp;&emsp;Giuseppe B.</p>
                                <Button variant='dark' size="sm" style={{ width: 250 }} onClick={() => { }}>View Quote</Button>
                              </ div>
                              <div>
                              </div>
                            </ div>
                            <hr />
                            <div style={{ textAlign: 'center' }}>
                              <Button
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                                variant='dark'
                              >
                                Expand Inventory Table
                              </Button>
                              <Collapse in={open}>
                                <div id="example-collapse-text">
                                  <br />
                                  <PaginationProvider
                                    pagination={paginationFactory(options2)}
                                  >
                                    {
                                      ({
                                        paginationProps,
                                        paginationTableProps
                                      }) => (
                                        <div>
                                          <BootstrapTable
                                            key='inventory_table'
                                            bootstrap4
                                            condensed
                                            {...paginationTableProps}
                                            columns={column_inner}
                                            keyField="serial_number"
                                            data={fake_data_inner}
                                            classes="table table-dark table-hover table-striped"
                                            noDataIndication="Table is Empty"
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
                              </Collapse>
                            </div>
                            <hr />
                          </ div>

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
    </section >
  );
};

export const Home = withRouter(HomeLayout);
