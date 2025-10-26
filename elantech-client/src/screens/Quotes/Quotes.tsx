import React, { FunctionComponent, HTMLAttributes, useState, useCallback, useMemo } from 'react';
import { Button, DropdownButton, Dropdown, InputGroup } from 'react-bootstrap';
import { Pencil, Plus, Search, Trash } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CompanyModal } from '../../components/Modals/Company/CompanyModal';
import { ExpandedQuoteRow } from '../../components/ExpandedQuoteRow/ExpandedQuoteRow';
import ICompany from '../../types/ICompany';
import { defaultCompany } from '../../constants/Defaults';
import './Quotes.css';
import { RemoveCompanyModal } from '../../components/Modals/Company/RemoveCompanyModal';
import { DebounceInput } from 'react-debounce-input';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { UseCompany } from '../../hooks/UseCompany';
import { CustomAlert } from '../../components/Alerts/CustomAlert';

interface QuotesProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

enum ModalType {
  ADD = 'add',
  EDIT = 'edit',
  REMOVE = 'remove',
}

const getColumns = (
  rankFormatterEdit: (cell: any, row: ICompany) => JSX.Element,
  rankFormatterRemove: (cell: any, row: ICompany) => JSX.Element
) => ([
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
  },
  {
    dataField: 'name',
    text: 'Company Name',
    sort: true,
  },
  {
    dataField: 'representative',
    text: 'Representative',
    sort: true,
  },
  {
    dataField: 'phone',
    text: 'Phone Number',
    sort: false,
    headerAlign: 'center',
  },
  {
    dataField: 'email',
    text: 'Email',
    sort: false,
    headerAlign: 'center',
  },
  {
    dataField: 'location',
    text: 'Location',
    sort: false,
  },
  {
    dataField: 'comment',
    text: 'Comments',
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
  },
]);

export const QuotesLayout: FunctionComponent<QuotesProps> = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<ICompany>(defaultCompany);
  const { companies, alert, fetchCompanies } = UseCompany();

  const handleEditClick = useCallback((company: ICompany) => {
    setSelectedCompany(company);
    setActiveModal(ModalType.EDIT);
  }, []);

  const handleRemoveClick = useCallback((company: ICompany) => {
    setSelectedCompany(company);
    setActiveModal(ModalType.REMOVE);
  }, []);

  const rankFormatterRemove = useCallback((_: unknown, data: ICompany) => (
    <div className='action-cell' onClick={(e) => { e.stopPropagation(); handleRemoveClick(data); }}>
      <Trash style={{ fontSize: 20, color: 'white' }} />
    </div>
  ), [handleRemoveClick]);

  const rankFormatterEdit = useCallback((_: unknown, data: ICompany) => (
    <div className='action-cell' onClick={(e) => { e.stopPropagation(); handleEditClick(data); }}>
      <Pencil style={{ fontSize: 20, color: 'white' }} />
    </div>
  ), [handleEditClick]);

  const columns = useMemo(() => getColumns(rankFormatterEdit, rankFormatterRemove), [rankFormatterEdit, rankFormatterRemove]);

  const displayedCompanies = useMemo(() => {
    if (!searchString) {
      return companies;
    }
    return companies.filter(company =>
      Object.values(company).some(value =>
        value?.toString().toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [companies, searchString]);

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
      <span className="react-bootstrap-table-pagination-total"
        style={{ marginLeft: 5 }}>
        {size} Results
      </span>)
  };

  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
  };

  return (
    <section className="text-white main-section overflow-auto">
      <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h2 style={{ fontWeight: 300 }}>Quotes by Company</h2>
          <div>
            <Button variant="dark" onClick={() => setActiveModal(ModalType.ADD)}>
              <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Company
            </Button>
          </div>
        </div>
        <hr />
        <ToolkitProvider
          keyField="id"
          data={displayedCompanies}
          columns={columns}
          search >
          {
            props => {
              return (
                <div>
                  <div>
                    <div className='d-flex' style={{ width: 'max-content' }}>
                      <InputGroup className="mb-1">
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
                            handleSearch(e.target.value);
                          }} />
                      </InputGroup>
                      <div className='d-flex'>
                        <DropdownButton
                          key={'dark'}
                          variant="dark"
                          menuVariant="dark"
                          title="Search History"
                          onSelect={e => {
                            setTimeout(() => handleSearch(e as string), 100);
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
                      </div>
                    </div>
                    <br />
                    <BootstrapTable
                      {...props.baseProps}
                      keyField="id"
                      bootstrap4
                      data={displayedCompanies}
                      columns={columns}
                      classes="table table-dark table-hover table-striped table-responsive"
                      noDataIndication="Table is Empty"
                      pagination={paginationFactory(options)}
                      expandRow={{
                        onlyOneExpanding: true,
                        renderer: (row) => {
                          return (
                            <ExpandedQuoteRow
                              selectedCompany={row}
                              fetchCompanies={fetchCompanies}
                            />
                          )
                        }
                      }}
                    />
                  </div>
                </div>
              );
            }
          }
        </ToolkitProvider>
      </div >
      {
        activeModal === ModalType.ADD &&
        <div className='modal-dialog'>
          <CompanyModal
            modalVisible={activeModal === ModalType.ADD}
            modalSwitch={0}
            selectedCompany={defaultCompany()}
            onClose={() => setActiveModal(null)}
            onSuccess={fetchCompanies}
          />
        </div>
      }
      {
        activeModal === ModalType.EDIT &&
        <div className='modal-dialog'>
          <CompanyModal
            modalVisible={activeModal === ModalType.EDIT}
            modalSwitch={1}
            selectedCompany={selectedCompany}
            onClose={() => setActiveModal(null)}
            onSuccess={fetchCompanies}
          />
        </div>
      }
      {
        activeModal === ModalType.REMOVE &&
        <div className='modal-dialog'>
          <RemoveCompanyModal
            modalVisible={activeModal === ModalType.REMOVE}
            selectedCompany={selectedCompany}
            onClose={() => setActiveModal(null)}
            onSuccess={fetchCompanies}
          />
        </div>
      }
    </section >
  );
};

export const Quotes = withRouter(QuotesLayout);
