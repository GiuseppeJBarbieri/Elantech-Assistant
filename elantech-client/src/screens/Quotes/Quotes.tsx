import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';

import './Quotes.css';

interface QuotesProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const QuotesLayout: FunctionComponent<QuotesProps> = ({ history }) => {

  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Quotes by Products</h2>
          <div>
          <Button variant="dark">
            <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }}/>New Quote
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
    </section >

  );
};

export const Quotes = withRouter(QuotesLayout);
