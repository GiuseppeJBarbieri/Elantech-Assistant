import React, { FunctionComponent, HTMLAttributes, useState, useCallback, useMemo, useEffect } from 'react';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import { Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { Pencil, Plus, Search, Trash } from 'react-bootstrap-icons';
import { DebounceInput } from "react-debounce-input";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';
import { brandOptions, typeOptions } from '../../constants/Options';
import IProduct from '../../types/IProduct';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { UseProducts } from '../../hooks/UseProducts';
import { CustomAlert } from '../../components/Alerts/CustomAlert';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './Home.css';
import { PAGE_ROUTES } from '../../constants/PageRoutes';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

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
      options: typeOptions,
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
      options: brandOptions,
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

export const HomeLayout: FunctionComponent<HomeProps> = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const history = useHistory();
  const { products, alert, fetchProducts } = UseProducts();

  useEffect(() => {
    const locationState = history.location.state as { newProductNumber?: string };
    if (locationState?.newProductNumber) {
      handleSearch(locationState.newProductNumber);
      // Clear the state so it doesn't trigger again on refresh
      history.replace({ ...history.location, state: undefined });
    }
  }, [history]);

  const handleEditClick = useCallback((product: IProduct) => {
    history.push({
      pathname: PAGE_ROUTES.EDIT_PRODUCT,
      state: { product }
    });
  }, []);

  const handleRemoveClick = useCallback((product: IProduct) => {
    history.push({
      pathname: PAGE_ROUTES.DELETE_PRODUCT,
      state: { product }
    });
  }, []);

  const handleNewProductClick = () => {
    history.push(PAGE_ROUTES.NEW_PRODUCT)
  };

  const rankFormatterRemove = useCallback((_: unknown, data: IProduct) => (
    <div className='action-cell' onClick={() => handleRemoveClick(data)}>
      <Trash className='action-icon' />
    </div>
  ), [handleRemoveClick]);

  const rankFormatterEdit = useCallback((_: unknown, data: IProduct) => (
    <div className='action-cell' onClick={() => handleEditClick(data)}>
      <Pencil className='action-icon' />
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
  const customTotal = (from: number, to: number, size: number) => {
    return (
      <span className='react-bootstrap-table-pagination-total pagination-total'>
        {size} Results
      </span>)
  };
  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal
  };
  return (
    <section className='text-white main-section overflow-auto'>
      <div className='home-container'>
        <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Products</h2>
          <div>
            <Button variant="dark" onClick={() => handleNewProductClick()}>
              <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />New Product
            </Button>
          </div>
        </div>
        <hr />
        <ToolkitProvider
          keyField='id'
          data={displayedProducts}
          columns={columns}
          search
        >
          {
            props => {
              return (
                <div>
                  <div className='d-flex' style={{ width: 'max-content' }}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text id='basic-addon2'>
                        <Search />
                      </InputGroup.Text>
                      <DebounceInput
                        type='text'
                        className='debounce'
                        placeholder='Search...'
                        debounceTimeout={500}
                        value={searchString}
                        onChange={e => {
                          handleSearch(e.target.value);
                        }}
                      />
                    </InputGroup>
                    <div className='d-flex'>
                      <DropdownButton
                        key={'dark'}
                        variant='dark'
                        menuVariant='dark'
                        title=''
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
                    </div>
                  </div>
                  <br />
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4
                    classes='table table-dark table-hover table-striped table-responsive'
                    noDataIndication='Table is Empty'
                    pagination={paginationFactory(options)}
                    filter={filterFactory()}
                    expandRow={{
                      onlyOneExpanding: true,
                      renderer: (row: IProduct) => {
                        return (
                          <ExpandedProductRow
                            selectedProduct={row} />
                        );
                      }
                    }}
                  />
                </div>
              );
            }
          }
        </ToolkitProvider>
      </div>
    </section >
  );
};

export const Home = withRouter(HomeLayout);
