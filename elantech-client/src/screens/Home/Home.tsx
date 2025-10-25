import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useCallback, useMemo, useState } from 'react';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { Pencil, Search as SearchIcon, Trash } from 'react-bootstrap-icons';
import { DebounceInput } from 'react-debounce-input';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';
import { ProductModal } from '../../components/Modals/Product/ProductModal';
import { RemoveProductModal } from '../../components/Modals/Product/RemoveProductModal';
import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { clearCookie } from '../../utils/Auth';
import { TopHomeBar } from '../../components/TopPageBars/TopHomeBar';
import { requestLogout } from '../../utils/Requests';
import { defaultProduct } from '../../constants/Defaults';
import { brandOptionsList, typeOptionsList } from '../../constants/Options';

import IProduct from '../../types/IProduct';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Home.css';
import { SpinnerBlock } from '../../components/LoadingAnimation/SpinnerBlock';
import { UseProducts } from '../../hooks/UseProducts';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type ModalType = 'add' | 'edit' | 'remove' | null;

const getColumns = (
  rankFormatterEdit: (cell: any, row: IProduct) => JSX.Element,
  rankFormatterRemove: (cell: any, row: IProduct) => JSX.Element
) => ([
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
    headerAlign: 'center',
    filter: selectFilter({
      options: typeOptionsList,
      placeholder: 'Type',
      className: 'btn btn-dark',
      style: { height: 25, padding: 0 }
    }),
    sort: true,
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
]);

export const HomeLayout: FunctionComponent<HomeProps> = ({ history, loggedIn, setLoggedIn }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(defaultProduct);

  const { products, isLoading, refetchProducts } = UseProducts();

  const handleEditClick = useCallback((product: IProduct) => {
    setSelectedProduct(product);
    setActiveModal('edit');
  }, []);

  const handleRemoveClick = useCallback((product: IProduct) => {
    setSelectedProduct(product);
    setActiveModal('remove');
  }, []);

  const rankFormatterRemove = useCallback((_: unknown, data: IProduct) => (
    <div className="action-cell" onClick={() => handleRemoveClick(data)}>
      <Trash className="action-icon" />
    </div>
  ), [handleRemoveClick]);

  const rankFormatterEdit = useCallback((_: unknown, data: IProduct) => (
    <div className="action-cell" onClick={() => handleEditClick(data)}>
      <Pencil className="action-icon" />
    </div>
  ), [handleEditClick]);

  const columns = useMemo(() => getColumns(rankFormatterEdit, rankFormatterRemove), [rankFormatterEdit, rankFormatterRemove]);

  const displayedProducts = useMemo(() => {
    if (!searchString) {
      return products;
    }
    return products.filter(product =>
      Object.values(product).some(value =>
        value?.toString().toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [products, searchString]);

  const handleSearch = (input: string) => {
    setSearchString(input);

    // Add to search history if it's a new, non-whitespace term
    if (input.trim() && !searchHistory.includes(input)) {
      const newHistory = [input, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
    }
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
      <span className="react-bootstrap-table-pagination-total pagination-total">
        {size} Results
      </span>)
  };
  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal
  };
  return (
    <section className="text-white main-section overflow-auto">
      <div className="home-container">
        <TopHomeBar logout={logout} setAddProductSwitch={() => setActiveModal('add')} />
        <hr />
        <div>
          <ToolkitProvider
            keyField="id"
            data={displayedProducts}
            columns={columns}
            search
          >
            {
              props => {
                return (
                  <div className='table-container'>
                    {isLoading ?
                      <div className="table-loading-overlay"><SpinnerBlock /></div>
                      :
                      <div>
                        <div className='d-flex justify-content-between'>
                          <div className='d-flex justify-space-between'>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon2">
                                <SearchIcon />
                              </InputGroup.Text>
                              <DebounceInput
                                type="text"
                                className='debounce'
                                placeholder="Search..."
                                debounceTimeout={500}
                                value={searchString}
                                onChange={e => {
                                  handleSearch(e.target.value);
                                }} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                              <DropdownButton
                                key={'dark'}
                                variant="dark"
                                menuVariant="dark"
                                title="History"
                                onSelect={e => {
                                  setTimeout(() => { handleSearch(e as string) }, 100);
                                }}
                              >
                                {searchHistory.length > 0 ?
                                  searchHistory.map((o, index) => {
                                    return <Dropdown.Item key={index} eventKey={o} >{o}</Dropdown.Item>;
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
                                  refetchProducts={refetchProducts} />
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
        activeModal === 'add' &&
        <div className='modal-dialog'>
          <ProductModal
            modalVisible={activeModal === 'add'}
            modalSwitch={0}
            selectedProduct={defaultProduct()}
            onClose={() => setActiveModal(null)}
            onSuccess={refetchProducts}
          />
        </div>
      }
      {
        activeModal === 'edit' &&
        <div className='modal-dialog'>
          <ProductModal
            modalVisible={activeModal === 'edit'}
            modalSwitch={1}
            selectedProduct={selectedProduct}
            onClose={() => setActiveModal(null)}
            onSuccess={refetchProducts}
          />
        </div>
      }
      {
        activeModal === 'remove' &&
        <div className='modal-dialog'>
          <RemoveProductModal
            modalVisible={activeModal === 'remove'}
            selectedProduct={selectedProduct}
            onClose={() => setActiveModal(null)}
            onSuccess={refetchProducts}
          />
        </div>
      }

    </section >
  );
};

export const Home = withRouter(HomeLayout);
