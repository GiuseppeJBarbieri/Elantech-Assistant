import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from 'react';
import { Modal, Form, Button, Col, InputGroup } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { requestAddQuote, requestAddQuotedProduct, requestAllCompanies } from '../../../utils/Requests';
import { defaultAlert, defaultQuote, defaultQuotedProduct } from '../../../constants/Defaults';
import { conditionList } from '../../../constants/Options';
import ICompany from '../../../types/ICompany';
import IProduct from '../../../types/IProduct';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { CustomAlert } from '../../Alerts/CustomAlert';
import IQuotedProduct from '../../../types/IQuotedProduct';
import moment from 'moment';

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

    const options = {
        custom: true,
        totalSize: companyList.length
    };
    const column = [
        {
            dataField: 'companyType',
            text: 'Type',
            sort: true,
        },
        {
            dataField: 'companyName',
            text: 'Company Name',
            sort: true,
        },
        {
            dataField: 'companyRep',
            text: 'Company Rep',
            sort: true,
        },
        {
            dataField: 'phoneNumber',
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
        setCompanyList(JSON.parse(JSON.stringify(req)));
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
            if (quotedProduct.productCondition === '' || quotedProduct.quantity === 0 || quote.dateQuoted === '') {
                setAlert({ ...alert, label: 'Missing Required Information!', show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            } else if (quote.companyId === 0) {
                setAlert({ ...alert, label: 'Please Select a Company', show: true });
                setTimeout(() => setAlert({ ...alert, show: false }), 3000);
                setIsSaving(false);
            } else {
                try {
                    const req = await requestAddQuote(quote);
                    const quotedProductCopy: IQuotedProduct = JSON.parse(JSON.stringify(quotedProduct));
                    quotedProductCopy.productId = props.selectedProduct.id as number;
                    quotedProductCopy.quoteId = req.data.id;
                    await requestAddQuotedProduct(quotedProductCopy);
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
                                        id="Quantity" type="text" placeholder="Quantity"
                                        value={quotedProduct.quantity}
                                        onChange={(e) => setQuotedProduct({ ...quotedProduct, quantity: Number.parseInt(e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="Price" type="text" placeholder="Price"
                                        value={quotedProduct.quotedPrice}
                                        onChange={(e) => setQuotedProduct({ ...quotedProduct, quotedPrice: Number.parseInt(e.target.value) })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control id="Date" type="date"
                                        value={quote.dateQuoted}
                                        onChange={(e) => setQuote({ ...quote, dateQuoted: moment(e.target.value).format('YYYY-MM-DD') })}
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
                                                            condensed
                                                            selectRow={selectRow as SelectRowProps<ICompany>}
                                                            data={companyList}
                                                            columns={column}
                                                            classes="table table-dark table-hover table-striped"
                                                            noDataIndication="Table is Empty"
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