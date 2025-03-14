import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from 'react';
import { Modal, Form, Button, Col, InputGroup } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { requestAddQuote, requestAllCompanies } from '../../../utils/Requests';
import { defaultAlert, defaultQuote, defaultQuotedProduct } from '../../../constants/Defaults';
import { conditionList } from '../../../constants/Options';
import ICompany from '../../../types/ICompany';
import IProduct from '../../../types/IProduct';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { Search } from 'react-bootstrap-icons';
import { DebounceInput } from 'react-debounce-input';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

interface AddSimpleQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    modalVisible: boolean;
    selectedProduct: IProduct;
    getAllQuotes: (productId: number) => void;
}

const AddSimpleQuoteModalComponent: FunctionComponent<AddSimpleQuoteModalProps> = (props) => {
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [quote, setQuote] = useState(defaultQuote);
    const [quotedProduct, setQuotedProduct] = useState(defaultQuotedProduct);
    const [searchString] = useState<string>('');
    const [isSearching] = useState(false);
    const [dateQuoted, setDateQuoted] = useState<Date>(new Date());

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
    const column = [
        {
            dataField: 'type',
            text: 'Type',
            sort: true,
        },
        {
            dataField: 'name',
            text: 'Name',
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
            dataField: 'comments',
            text: 'Comments',
            sort: false,
        },
    ];
    const getCompanyList = async () => {
        const req = await requestAllCompanies();
        setCompanyList(req);
    }
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#0da7fd73 !important',
        onSelect: (row: ICompany) => {
            setQuote({ ...quote, companyId: (row.id as number) });
        },
    };
    const submitQuote = () => {
        setIsSaving(true);
        setTimeout(async () => {
            if (quotedProduct.productCondition === '' || quotedProduct.quantity === 0 || !quote.dateQuoted) {
                setAlert({ ...alert, label: 'Missing Required Information!', show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            } else if (quote.companyId === 0) {
                setAlert({ ...alert, label: 'Please Select a Company', show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            } else {
                try {
                    quotedProduct.productId = props.selectedProduct.id as number;
                    quote.quotedProducts = [quotedProduct];
                    await requestAddQuote(quote);
                    props.getAllQuotes(props.selectedProduct.id as number);
                    setIsSaving(false);
                    props.onClose();
                } catch (err) {
                    setAlert({ ...alert, label: `${err}`, show: true });
                    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                    setIsSaving(false);
                }
            }
        }, 500);
    };
    const handleSearch = (input: string, props: { searchText?: string; onSearch: any; onClear?: () => void; }) => {
        if (input !== undefined) {
            props.onSearch(input);
        }
    };
    useEffect(() => {
        getCompanyList();
    }, [setCompanyList]);
    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header style={{ background: '#212529', color: 'white', borderBottom: '1px solid rgb(61 66 70)' }} closeButton>
                    <Modal.Title>
                        <h2 style={{ verticalAlign: '', fontWeight: 300 }} >Quick Quote</h2>
                        <p style={{ color: 'darkgray', fontSize: 18, fontWeight: 300 }}>Please enter quote information.</p>
                        <p className={'required-text'}>Required *</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#2c3034', color: 'white' }}>
                    <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <Form className="container d-grid" >
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={quotedProduct.productCondition}
                                        onChange={(e) => setQuotedProduct({ ...quotedProduct, productCondition: (e.target.value) })}>
                                        <option>Condition</option>
                                        {
                                            conditionList.map(condition => {
                                                return (<option key={condition} value={condition}>{condition}</option>);
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="Quantity" type="number" placeholder="Quantity"
                                        value={quotedProduct.quantity}
                                        onChange={(e) => {
                                            if (e.target.value != '') {
                                                setQuotedProduct({ ...quotedProduct, quantity: Number.parseInt(e.target.value) })
                                            } else {
                                                setQuotedProduct({ ...quotedProduct, quantity: 0 })
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="Price" type="text" placeholder="Price"
                                        value={quotedProduct.quotedPrice}
                                        onChange={(e) => {
                                            if (e.target.value != '') {
                                                setQuotedProduct({ ...quotedProduct, quotedPrice: Number.parseInt(e.target.value) })
                                            } else {
                                                setQuotedProduct({ ...quotedProduct, quotedPrice: 0 })
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control id="Date" type="date"
                                        value={dateQuoted.toISOString().split("T")[0]}
                                        onChange={(e) => {
                                            if (e.target.value != '') {
                                                const newDate = new Date(e.target.value);
                                                setDateQuoted(newDate);
                                                setQuote({ ...quote, dateQuoted: newDate });
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Sold</Form.Label>
                                    <InputGroup>
                                        <div key={'inline-radio-2'} style={{ justifyContent: 'space-between' }}>
                                            <Form.Check
                                                inline
                                                defaultChecked
                                                label="Yes"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-3'}
                                                onClick={() => {
                                                    setQuote({ ...quote, sold: true })
                                                }}
                                            />
                                            <Form.Check
                                                inline
                                                label="No"
                                                name='group2'
                                                type={'radio'}
                                                id={'inline-radio-4'}
                                                onClick={() => {
                                                    setQuote({ ...quote, sold: false })
                                                }}
                                            />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="Comments" as="textarea" placeholder="Comments"
                                        value={quotedProduct.comment}
                                        onChange={(e) => setQuotedProduct({ ...quotedProduct, comment: e.target.value })}
                                    />
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3">
                                    <Form.Label>Select a Company</Form.Label>
                                    <div>
                                        <div>
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

                                                                        <BootstrapTable
                                                                            {...props.baseProps}
                                                                            keyField="id"
                                                                            bootstrap4
                                                                            condensed
                                                                            striped
                                                                            hover
                                                                            selectRow={selectRow as SelectRowProps<ICompany>}
                                                                            pagination={paginationFactory(options)}
                                                                            data={companyList}
                                                                            columns={column}
                                                                            classes="table table-dark table-hover table-striped"
                                                                            noDataIndication='TABLE IS EMPTY'
                                                                        />
                                                                    </div>
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                }
                                            </ToolkitProvider>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ background: '#212529', color: 'white', borderTop: '1px solid rgb(61 66 70)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            variant="dark"
                            onClick={async () => {
                                submitQuote();
                            }}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const AddSimpleQuoteModal = withRouter(AddSimpleQuoteModalComponent);