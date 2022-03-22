import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import IProduct from '../../types/IProduct';
import './Home.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { RemoveProductModal } from '../../components/RemoveProductModal/RemoveProductModal';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const HomeLayout: FunctionComponent<HomeProps> = ({ history }) => {
  const [addProductSwitch, setAddProductSwitch] = useState(false);
  const [editProductSwitch, setEditProductSwitch] = useState(false);
  const [removeProductSwitch, setRemoveProductSwitch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();

  const rankFormatterRemove = (_: any, data: any, index: any) => {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal'
        }}
        onClick={(e) => {
          e.stopPropagation()
        }} >
        <div onClick={(e) => {
          setRemoveProductSwitch(true);
          setSelectedProduct(data)
        }}
        >
          <Trash style={{ fontSize: 20, color: 'white' }} />
        </div>
      </div>
    );
  };
  const rankFormatterEdit = (_: any, data: any, index: any) => {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal',
          zIndex: 0
        }}
        onClick={(e) => {
          e.stopPropagation()
        }} >
        <div onClick={(e) => {
          setEditProductSwitch(true);
          setSelectedProduct(data)
        }}
        >
          <Pencil style={{ fontSize: 20, color: 'white' }} />
        </div>
      </div>
    );
  };
  const column = [
    {
      id: 1,
      dataField: "quantity",
      text: "QTY",
      sort: true,
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
      style: {
        maxWidth: 180
      }
    },
    {
      id: 7,
      dataField: "product_type",
      text: "Type",
      sort: true,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
    {
      id: 8,
      dataField: "brand",
      text: "Brand",
      sort: true,
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
      style: {
        maxWidth: 280
      }
    },
    {
      id: 12,
      dataField: "last_added",
      text: "Last Added",
      sort: true,
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
      product_number: '804331-B21',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-002',
      alt_4: '871820-003',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B212',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B213',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B214',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B215',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B216',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B217',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
    {
      quantity: 130,
      product_number: '804331-B218',
      product_type: 'Raid Controller',
      brand: 'HPE',
      description: 'HPE Smart Array P408i-a SR Gen10 Controller',
      last_added: '2022-01-29',
      alt_1: '877946-001',
      alt_2: '809461-001',
      alt_3: '875056-001',
      alt_4: '871820-001',
      ebay_link: 'https://www.ebay.com/itm/294851127729?hash=item44a67f29b1:g:nnYAAOSw6RdiJlYX',
      website_link: 'https://elantechit.com/hpe-804331-b21',
      quick_specs: 'https://www.hpe.com/psnow/doc/a00008200enw?jumpid=in_lit-psnow-red',
      related_tags: 'DL380G10',
    },
  ];
  const options = {
    custom: true,
    totalSize: fake_data.length
  };
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Products</h2>
          <div>
            <Button variant="dark" style={{ marginRight: 5 }}>Export to Excel</Button>
            <Button variant="dark" onClick={() => { setAddProductSwitch(true) }}>
              <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />New Product
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
              title={'Filter Products '}
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
              title={'Search History '}
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
                          <ExpandedProductRow
                            selectedProduct={row} />
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
          <ProductModal
            modalVisible={addProductSwitch}
            modalSwitch={0}
            selectedProduct={undefined}
            onClose={async () => {
              setAddProductSwitch(false);
            }}
          />
        </div>
      }
      {
        editProductSwitch &&
        <div className='modal-dialog'>
          <ProductModal
            modalVisible={editProductSwitch}
            modalSwitch={1}
            selectedProduct={selectedProduct}
            onClose={async () => {
              setEditProductSwitch(false);
            }}
          />
        </div>
      }
      {
        removeProductSwitch &&
        <div className='modal-dialog'>
          <RemoveProductModal
            modalVisible={removeProductSwitch}
            selectedProduct={selectedProduct}
            onClose={async () => {
              setRemoveProductSwitch(false);
            }}
          />
        </div>
      }
    </section >
  );
};

export const Home = withRouter(HomeLayout);
