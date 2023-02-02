/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, HTMLAttributes, useState, useEffect } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CompanyModal } from '../../components/Modals/Company/CompanyModal';
import { ExpandedQuoteRow } from '../../components/ExpandedQuoteRow/ExpandedQuoteRow';
import ICompany from '../../types/ICompany';
import { requestAllCompanies } from '../../utils/Requests';
import { defaultCompany } from '../../constants/Defaults';
import './Quotes.css';
import { RemoveCompanyModal } from '../../components/Modals/Company/RemoveCompanyModal';

interface QuotesProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const QuotesLayout: FunctionComponent<QuotesProps> = ({ history }) => {
  const [addCompanySwitch, setAddCompanySwitch] = useState(false);
  const [editCompanySwitch, setEditCompanySwitch] = useState(false);
  const [removeCompanySwitch, setRemoveCompanySwitch] = useState(false);
  const [companyList, setCompanyList] = useState<ICompany[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<ICompany>(defaultCompany);

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
  const column = [

    {
      id: 1,
      dataField: "companyType",
      text: "Type",
      sort: true,
    },
    {
      id: 2,
      dataField: "companyName",
      text: "Company Name",
      sort: true,
    },
    {
      id: 3,
      dataField: "companyRep",
      text: "Company Rep",
      sort: true,
    },
    {
      id: 4,
      dataField: "phoneNumber",
      text: "Phone Number",
      sort: false,
      headerAlign: 'center',
    },
    {
      id: 5,
      dataField: "email",
      text: "Email",
      sort: false,
      headerAlign: 'center',
    },
    {
      id: 6,
      dataField: "location",
      text: "Location",
      sort: false,
    },
    {
      id: 7,
      dataField: "comments",
      text: "Comments",
      sort: false,
    },
    {
      id: 8,
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: rankFormatterEdit,
      headerAlign: 'center',
    },
    {
      id: 9,
      dataField: "remove",
      text: "Remove",
      sort: false,
      formatter: rankFormatterRemove,
      headerAlign: 'center',
    },
  ];
  const options = {
    custom: true,
    totalSize: companyList.length
  };
  const getAllCompanies = async () => {
    setCompanyList(await requestAllCompanies());
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
        <div className='d-flex justify-content-between'>
          <input type='text'
            className="form-control custom-input"
            placeholder="Search Company"
            style={{ width: 200 }}
          />
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
                    {...paginationTableProps}
                    keyField="id"
                    bootstrap4
                    data={companyList}
                    columns={column}
                    classes="table table-dark table-hover table-striped table-responsive"
                    noDataIndication="Table is Empty"
                    expandRow={{
                      onlyOneExpanding: true,
                      // eslint-disable-next-line react/display-name
                      renderer: (row) => {
                        return (
                          <ExpandedQuoteRow
                            selectedCompany={row}
                          />
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
