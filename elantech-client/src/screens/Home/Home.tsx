import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { Pencil, Search, Trash } from 'react-bootstrap-icons';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { DebounceInput } from 'react-debounce-input';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';
import { ProductModal } from '../../components/Modals/Product/ProductModal';
import IProduct from '../../types/IProduct';
import { RemoveProductModal } from '../../components/Modals/Product/RemoveProductModal';
import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { clearCookie } from '../../utils/Auth';
import { TopHomeBar } from '../../components/TopPageBars/TopHomeBar';
import { SpinnerBlock } from '../../components/LoadingAnimation/SpinnerBlock';
import { requestAllProducts, requestLogout } from '../../utils/Requests';
import { defaultProduct } from '../../constants/Defaults';
import { brandOptionsList, typeOptionsList } from '../../constants/Options';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Home.css';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomeLayout: FunctionComponent<HomeProps> = ({ history, loggedIn, setLoggedIn }) => {
  const [addProductSwitch, setAddProductSwitch] = useState(false);
  const [editProductSwitch, setEditProductSwitch] = useState(false);
  const [removeProductSwitch, setRemoveProductSwitch] = useState(false);
  const [searchHistoryFilterText, setSearchHistoryFilterText] = useState('Search History');
  const [isSearching] = useState(false);
  const [searchString, setSearchString] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(defaultProduct);

  const rankFormatterRemove = (_: unknown, data: IProduct) => {
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
        <div onClick={() => {
          setSelectedProduct(data);
          setRemoveProductSwitch(true);
        }}
        >
          <Trash style={{ fontSize: 20, color: 'white' }} />
        </div>
      </div>
    );
  };
  const rankFormatterEdit = (_: unknown, data: IProduct) => {
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
          setSelectedProduct(data);
        }}
        >
          <Pencil style={{ fontSize: 20, color: 'white' }} />
        </div>
      </div>
    );
  };
  const column = [
    {
      dataField: 'quantity',
      text: 'QTY',
      sort: true,
      headerAlign: 'center',
    },
    {
      dataField: 'productNumber',
      text: 'Product Number',
      sort: true,
    },
    {
      text: '',
      dataField: 'productType',
      sort: true,
      headerAlign: 'center',
      filter: selectFilter({
        options: typeOptionsList,
        placeholder: 'Type',
        className: 'btn btn-dark',
        style: { height: 25, padding: 0 }
      }),
    },
    {
      text: '',
      dataField: 'brand',
      headerAlign: 'center',
      sort: true,
      filter: selectFilter({
        options: brandOptionsList,
        placeholder: 'Brand',
        className: 'btn btn-dark',
        style: { height: 25, padding: 0 }
      }),
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: false,
    },
    {
      dataField: 'edit',
      text: 'Edit',
      sort: false,
      formatter: rankFormatterEdit,
      headerAlign: 'center',
    },
    {
      dataField: 'remove',
      text: 'Remove',
      sort: false,
      formatter: rankFormatterRemove,
      headerAlign: 'center',
    }
  ];
  const handleSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
    if (input !== '' || input !== undefined) {
      const result = searchHistory.includes(input);
      if (!result) { input.length > 0 && searchHistory.push(input) }

      searchHistory.length > 5 && setSearchHistory(searchHistory.slice(1, searchHistory.length));
      setSearchString(input);
    } else {
      setSearchHistoryFilterText('Search History');
    }
    props.onSearch(input);
  };
  const getAllProducts = async () => {
    const products = await requestAllProducts();
    setProductList(products)
  };
  const logout = async () => {
    const response = await requestLogout();
    if (response.status === 200) {
      history.replace(PAGE_ROUTES.LOGIN);
      clearCookie();
      setLoggedIn(false);
    }
  };
  const customTotal = (from: number, to: number, size: number) => {
    return (
      <span className="react-bootstrap-table-pagination-total"
        style={{ marginLeft: 5 }}>
        {size} Results
      </span>)
  }
  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <TopHomeBar logout={logout} setAddProductSwitch={setAddProductSwitch} />
        <hr />
        <div>
          <ToolkitProvider
            keyField="id"
            data={productList}
            columns={column}
            search
          >
            {
              props => {
                return (
                  <div>
                    {isSearching ?
                      <SpinnerBlock />
                      :
                      <div>
                        <div className='d-flex justify-content-between'>
                          <div className='d-flex justify-space-between'>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon2">
                                <Search />
                              </InputGroup.Text>
                              <DebounceInput
                                type="text"
                                className='debounce'
                                placeholder="Search..."
                                debounceTimeout={500}
                                value={searchString}
                                onChange={e => {
                                  handleSearch(e.target.value, { ...props.searchProps });
                                }} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <DropdownButton
                                key={'dark'}
                                variant="dark"
                                menuVariant="dark"
                                title={searchHistoryFilterText}
                                onSelect={e => {
                                  setTimeout(() => handleSearch(e as string, { ...props.searchProps }), 100);
                                }}
                              >
                                {searchHistory.length > 0 ?
                                  searchHistory.map((o, index) => {
                                    return <Dropdown.Item key={index} eventKey={o}>{o}</Dropdown.Item>;
                                  })
                                  :
                                  <Dropdown.Item disabled>No History</Dropdown.Item>}
                                <Dropdown.Item eventKey=''>Clear</Dropdown.Item>
                              </DropdownButton>
                            </InputGroup>
                          </div>
                        </div>
                        <br />
                        <BootstrapTable
                          {...props.baseProps}
                          bootstrap4
                          striped
                          hover
                          noDataIndication='TABLE IS EMPTY'
                          pagination={paginationFactory(options)}
                          filter={filterFactory()}
                          classes="table table-dark table-hover table-striped table-responsive"
                          expandRow={{
                            onlyOneExpanding: true,
                            renderer: (row: IProduct) => {
                              return (
                                <ExpandedProductRow
                                  selectedProduct={row}
                                  getAllProducts={getAllProducts} />
                              );
                            }
                          }} />
                      </div>}
                  </div>
                );
              }
            }
          </ToolkitProvider>
        </div>
      </div>
      {
        addProductSwitch &&
        <div className='modal-dialog'>
          <ProductModal
            modalVisible={addProductSwitch}
            modalSwitch={0}
            selectedProduct={defaultProduct()}
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
              getAllProducts();
            }}
          />
        </div>
      }

    </section >
  );
};

export const Home = withRouter(HomeLayout);
