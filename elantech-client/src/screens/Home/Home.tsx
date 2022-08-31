import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
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
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/API';
import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { clearCookie } from '../../utils/Auth';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;

  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomeLayout: FunctionComponent<HomeProps> = ({ history, loggedIn, setLoggedIn }) => {
  const [addProductSwitch, setAddProductSwitch] = useState(false);
  const [editProductSwitch, setEditProductSwitch] = useState(false);
  const [removeProductSwitch, setRemoveProductSwitch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filterType, setFilterType] = useState('Filter Type');
  const [filterBrand, setFilterBrand] = useState('Filter Brand');
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(
    {
      productNumber: '',
      userId: 0,
      altNumber1: '',
      altNumber2: '',
      altNumber3: '',
      altNumber4: '',
      altNumber5: '',
      altNumber6: '',
      quantity: 0,
      productType: '',
      brand: '',
      description: '',
      ebayLink: '',
      websiteLink: '',
      quickSpecsLink: '',
      relatedTags: '',
    }
  );
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [productList, setProductList] = useState<IProduct[]>([]);

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
    },
    {
      id: 2,
      dataField: "productNumber",
      text: "Product Number",
      sort: true,
    },
    {
      id: 7,
      dataField: "productType",
      text: "Type",
      sort: true,
      headerAlign: 'center',
    },
    {
      id: 8,
      dataField: "brand",
      text: "Brand",
      sort: true,
      headerAlign: 'center',
    },
    {
      id: 9,
      dataField: "description",
      text: "Description",
      sort: false,
    },
    {
      id: 12,
      dataField: "lastAdded",
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
    },
    {
      id: 11,
      dataField: "remove",
      text: "Remove",
      sort: false,
      formatter: rankFormatterRemove,
      headerAlign: 'center',
    }

  ];

  const options = {
    custom: true,
    totalSize: productList.length
  };

  const filterProducts = (e: string) => {
    setIsSearching(true);
    if (e.length > 0) {
      setSearchText(e);
      searchHistory.push(e);
      if (searchHistory.length > 8) {
        searchHistory.splice(0, 1);
      }
    }
    let type_filter = filterType;
    let brand_filter = filterBrand;

    // if filterType is not - Filter Type
    // if filterBrand is not - Filter Brand
    // if filterBrand and Filter Type is not - 
    if (e.length === 0) {
      setProductList(productList);
    } else {
      setProductList(
        productList.filter(
          product =>
            product.productNumber.toLowerCase().includes(e)
            ||
            product.altNumber1?.toLowerCase().includes(e)
            ||
            product.altNumber2?.toLowerCase().includes(e)
            ||
            product.altNumber3?.toLowerCase().includes(e)
            ||
            product.altNumber4?.toLowerCase().includes(e)
            ||
            product.altNumber5?.toLowerCase().includes(e)
            ||
            product.altNumber6?.toLowerCase().includes(e)
            ||
            product.description.toLowerCase().includes(e)
        ));
    }
    setIsSearching(false);
  };

  const getAllProducts = () => {
    setTimeout(() => {
      axios.get(`${BASE_API_URL}products`, { withCredentials: true })
        .then((response) => {
          setProductList(response?.data?.payload);
        })
        .catch((err) => {
          console.log(err);
        })
    }, 400)
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const logout = () => {
    setTimeout(() => {
      axios.get(`${BASE_API_URL}users/logout`, { withCredentials: true })
        .then((response) => {
          clearCookie();
          setLoggedIn(false);
          history.replace(PAGE_ROUTES.LOGIN);
        })
        .catch((err) => {
          console.log(err);
        })
    }, 400)
  }
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Products</h2>
          <div>
            <Button variant="dark" style={{ marginRight: 5 }}>Export to CSV</Button>
            <Button variant="dark" onClick={() => { setAddProductSwitch(true) }}>
              <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />New Product
            </Button>
            <Button variant="dark" style={{ marginRight: 5 }} onClick={e => logout()}>
              Logout
            </Button>
          </div>
        </div>
        <hr style={{ marginBottom: 20, height: 3, borderRadius: 5, border: 1 }} />
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <DebounceInput
              type='input'
              value={searchText}
              className="form-control custom-input"
              placeholder="Search Product"
              minLength={1}
              style={{ width: 200, marginRight: 10 }}
              debounceTimeout={300}
              onChange={(e) => {
                setIsSearching(true);
                filterProducts(e.target.value.toLowerCase());
              }}
            />
          </div>
          <div className='d-flex'>
            <Button variant="dark" style={{ marginRight: 5 }}
              onClick={() => {
                setFilterBrand('Filter Brand');
                setFilterType('Filter Type');
                setProductList(productList);
                setSearchText('');
              }}
            >
              Clear Filters
            </Button>
            <DropdownButton
              variant="dark"
              menuVariant="dark"
              title={filterBrand}
              style={{ marginRight: 5 }}
              onSelect={(e) => {
                if (e !== null) {
                  if (e.toLowerCase() === 'clear') {
                    setProductList(productList);setFilterBrand('Filter Brand');
                  } else {
                    setProductList(productList.filter(product => product.brand.toLowerCase().includes(e.toLowerCase())));
                    setFilterBrand(e);
                  }
                  console.log(e);
                }
              }}
            >
              <Dropdown.Item eventKey="HPE">HPE</Dropdown.Item>
              <Dropdown.Item eventKey="Dell">Dell</Dropdown.Item>
              <Dropdown.Item eventKey="Cisco">Cisco</Dropdown.Item>
              <Dropdown.Item eventKey="Lenovo">Lenovo</Dropdown.Item>
              <Dropdown.Item eventKey="IBM">IBM</Dropdown.Item>
              <Dropdown.Item eventKey="Clear">Clear</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              variant="dark"
              menuVariant="dark"
              title={filterType}
              style={{ marginRight: 5 }}
              onSelect={(e) => {
                if (e !== null) {
                  if (e.toLowerCase() === 'clear') {
                    setProductList(productList);
                    setFilterType('Filter Type');
                  } else {
                    setProductList(productList.filter(product => product.productType.toLowerCase().includes(e.toLowerCase())));
                    setFilterType(e);
                  }
                }
              }}
            >
              <Dropdown.Item eventKey="CPU">CPU</Dropdown.Item>
              <Dropdown.Item eventKey="Memory">Memory</Dropdown.Item>
              <Dropdown.Item eventKey="SSD">SSD</Dropdown.Item>
              <Dropdown.Item eventKey="HDD">HDD</Dropdown.Item>
              <Dropdown.Item eventKey="Clear">Clear</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              key={'dark'}
              variant="dark"
              menuVariant="dark"
              title={'Search History '}
              onSelect={(e) => {
                if (e !== null) {
                  setSearchText(e);
                  filterProducts(e);
                }
              }}
            >
              {
                searchHistory.length > 0 ?
                  searchHistory.map((o) => {
                    return <Dropdown.Item eventKey={o}>{o}</Dropdown.Item>
                  })
                  :
                  <Dropdown.Item eventKey='1'>No History</Dropdown.Item>
              }
            </DropdownButton>
          </div>
        </div>
        <br />
        {isSearching ?
          <div className='spinnerDiv d-flex' >
            <div style={{ marginRight: 10 }}>
              <Spinner animation="border" role="status" />
            </div>
            <br />
            <div style={{ margin: 'auto' }}>
              <label>Loading...</label>
            </div>
          </div>
          :
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
                      keyField="productNumber"
                      bootstrap4
                      data={productList}
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
        }
      </div>
      {
        addProductSwitch &&
        <div className='modal-dialog'>
          <ProductModal
            modalVisible={addProductSwitch}
            modalSwitch={0}
            selectedProduct={{
              productNumber: '',
              userId: 0,
              altNumber1: '',
              altNumber2: '',
              altNumber3: '',
              altNumber4: '',
              altNumber5: '',
              altNumber6: '',
              quantity: 0,
              productType: '',
              brand: '',
              description: '',
              ebayLink: '',
              websiteLink: '',
              quickSpecsLink: '',
              relatedTags: '',
            }}
            getAllProducts={getAllProducts}
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
            getAllProducts={getAllProducts}
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
