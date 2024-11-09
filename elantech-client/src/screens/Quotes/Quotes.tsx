/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, HTMLAttributes, useState, useEffect } from 'react';
import { Button, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import { Pencil, Plus, Search, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CompanyModal } from '../../components/Modals/Company/CompanyModal';
import { ExpandedQuoteRow } from '../../components/ExpandedQuoteRow/ExpandedQuoteRow';
import ICompany from '../../types/ICompany';
import { requestAllCompanies, requestAllQuotesByCompanyID } from '../../utils/Requests';
import { defaultCompany } from '../../constants/Defaults';
import './Quotes.css';
import { RemoveCompanyModal } from '../../components/Modals/Company/RemoveCompanyModal';
import { DebounceInput } from 'react-debounce-input';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { SpinnerBlock } from '../../components/LoadingAnimation/SpinnerBlock';
import IQuote from '../../types/IQuote';

interface QuotesProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const QuotesLayout: FunctionComponent<QuotesProps> = ({ history }) => {
  const [addCompanySwitch, setAddCompanySwitch] = useState(false);
  const [editCompanySwitch, setEditCompanySwitch] = useState(false);
  const [removeCompanySwitch, setRemoveCompanySwitch] = useState(false);
  const [companyList, setCompanyList] = useState<ICompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<ICompany>(defaultCompany);
  const [searchString] = useState<string>('');
  const [isSearching] = useState(false);
  const [quotes, setQuotes] = useState<IQuote[]>([]);

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
        <div onClick={() => {
          setSelectedCompany(data);
          setRemoveCompanySwitch(true);
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
          setSelectedCompany(data);
          setEditCompanySwitch(true);
        }}
        >
          <Pencil style={{ fontSize: 20, color: 'white' }} />
        </div>
      </div>
    );
  };
  const customTotal = (from: number, to: number, size: number) => {
    return (
      <span className="react-bootstrap-table-pagination-total"
        style={{ marginLeft: 5 }}>
        {size} Results
      </span>)
  };
  const column = [

    {
      id: 1,
      dataField: 'type',
      text: 'Type',
      sort: true,
    },
    {
      id: 2,
      dataField: 'name',
      text: 'Company Name',
      sort: true,
    },
    {
      id: 3,
      dataField: 'representative',
      text: 'Representative',
      sort: true,
    },
    {
      id: 4,
      dataField: 'phone',
      text: 'Phone Number',
      sort: false,
      headerAlign: 'center',
    },
    {
      id: 5,
      dataField: 'email',
      text: 'Email',
      sort: false,
      headerAlign: 'center',
    },
    {
      id: 6,
      dataField: 'location',
      text: 'Location',
      sort: false,
    },
    {
      id: 7,
      dataField: 'comment',
      text: 'Comments',
      sort: false,
    },
    {
      id: 8,
      dataField: 'edit',
      text: 'Edit',
      sort: false,
      formatter: rankFormatterEdit,
      headerAlign: 'center',
    },
    {
      id: 9,
      dataField: 'remove',
      text: 'Remove',
      sort: false,
      formatter: rankFormatterRemove,
      headerAlign: 'center',
    },
  ];
  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
  };
  const getAllCompanies = async () => {
    setCompanyList(await requestAllCompanies());
  };
  const handleSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
    if (input !== undefined) {
      props.onSearch(input);
    }
  };
  useEffect(() => {
    getAllCompanies();
  }, []);
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Quotes by Company</h2>
          <div>
            <Button variant="dark" onClick={() => { setAddCompanySwitch(true) }}>
              <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Company
            </Button>
          </div>
        </div>
        <hr />
        <ToolkitProvider
          keyField="id"
          data={companyList}
          columns={column}
          search >
          {
            props => {
              return (
                <div>
                  {isSearching ?
                    <SpinnerBlock />
                    :
                    <div>
                      <div className='d-flex justify-content-between'>
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
                        <div className='d-flex'>
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
                      <BootstrapTable
                        {...props.baseProps}
                        keyField="id"
                        bootstrap4
                        data={companyList}
                        columns={column}
                        classes="table table-dark table-hover table-striped table-responsive"
                        noDataIndication="Table is Empty"
                        pagination={paginationFactory(options)}
                        expandRow={{
                          onlyOneExpanding: true,
                          renderer: (row) => {
                            return (
                              <ExpandedQuoteRow
                                selectedCompany={row}
                              />
                            )
                          }
                        }}
                      />
                    </div>
                  }
                </div>
              );
            }
          }
        </ToolkitProvider>
      </div >
      {
        addCompanySwitch &&
        <div className='modal-dialog'>
          <CompanyModal
            modalVisible={addCompanySwitch}
            modalSwitch={0}
            selectedCompany={defaultCompany()}
            getAllCompanies={getAllCompanies}
            onClose={async () => {
              setAddCompanySwitch(false);
            }}
          />
        </div>
      }
      {
        editCompanySwitch &&
        <div className='modal-dialog'>
          <CompanyModal
            modalVisible={editCompanySwitch}
            modalSwitch={1}
            selectedCompany={selectedCompany}
            getAllCompanies={getAllCompanies}
            onClose={async () => {
              setEditCompanySwitch(false);
            }}
          />
        </div>
      }
      {
        removeCompanySwitch &&
        <div className='modal-dialog'>
          <RemoveCompanyModal
            modalVisible={removeCompanySwitch}
            selectedCompany={selectedCompany}
            getAllCompanies={getAllCompanies}
            onClose={async () => {
              setRemoveCompanySwitch(false);
            }}
          />
        </div>
      }
    </section >
  );
};

export const Quotes = withRouter(QuotesLayout);
