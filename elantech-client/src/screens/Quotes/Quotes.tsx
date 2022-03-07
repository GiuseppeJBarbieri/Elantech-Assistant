import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Pencil, Plus } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedQuoteRow } from '../../components/ExpandedQuoteRow/ExpandedQuoteRow';

import './Quotes.css';

interface QuotesProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const QuotesLayout: FunctionComponent<QuotesProps> = ({ history }) => {

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
  const column = [

    {
      id: 1,
      dataField: "type",
      text: "Type",
      sort: true,
    },
    {
      id: 2,
      dataField: "company_name",
      text: "Company Name",
      sort: true,
    },
    {
      id: 3,
      dataField: "company_rep",
      text: "Company Rep",
      sort: true,
    },
    {
      id: 4,
      dataField: "phone_number",
      text: "Phone Number",
      sort: false,
      headerAlign: 'center',
    },
    {
      id: 5,
      dataField: "address",
      text: "Address",
      sort: false,
    },
    {
      id: 6,
      dataField: "comments",
      text: "Comments",
      sort: false,
    },
    {
      id: 7,
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: rankFormatterEdit,
      headerAlign: 'center',
      style: {
        textAlign: 'center'
      }
    },
  ];
  const fake_data = [
    {
      company_id: 1,
      type: 'Broker',
      company_name: 'Kings Collectables',
      company_rep: 'Giuseppe',
      phone_number: '631-278-8517',
      address: 'Farmingdale',
      comments: 'Nothing to be said!',
    },
    {
      company_id: 2,
      type: 'Broker',
      company_name: 'Kings Collectables',
      company_rep: 'Giuseppe',
      phone_number: '631-278-8517',
      address: 'Farmingdale',
      comments: 'Nothing to be said!',
    },
    {
      company_id: 3,
      type: 'Broker',
      company_name: 'Kings Collectables',
      company_rep: 'Giuseppe',
      phone_number: '631-278-8517',
      address: 'Farmingdale',
      comments: 'Nothing to be said!',
    },
    {
      company_id: 4,
      type: 'Broker',
      company_name: 'Kings Collectables',
      company_rep: 'Giuseppe',
      phone_number: '631-278-8517',
      address: 'Farmingdale',
      comments: 'Nothing to be said!',
    },
    {
      company_id: 5,
      type: 'Broker',
      company_name: 'Kings Collectables',
      company_rep: 'Giuseppe',
      phone_number: '631-278-8517',
      address: 'Farmingdale',
      comments: 'Nothing to be said!',
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
          <h2 style={{ fontWeight: 300 }}>Quotes by Company</h2>
          <div>
            <Button variant="dark" >
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
                    key='product_table'
                    {...paginationTableProps}
                    keyField="company_id"
                    bootstrap4
                    data={fake_data}
                    columns={column}
                    classes="table table-dark table-hover table-striped table-responsive"
                    noDataIndication="Table is Empty"
                    expandRow={{
                      onlyOneExpanding: true,
                      renderer: (row, index) => {
                        return (
                          <ExpandedQuoteRow />
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

export const Quotes = withRouter(QuotesLayout);
