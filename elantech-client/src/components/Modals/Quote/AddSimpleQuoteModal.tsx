import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { requestAddQuote, requestAllCompanies } from '../../../utils/Requests';
import { defaultAlert, defaultQuote, defaultQuotedProduct } from '../../../constants/Defaults';
import { conditionList } from '../../../constants/Options';
import ICompany from '../../../types/ICompany';
import IProduct from '../../../types/IProduct';
import IQuote from '../../../types/IQuote';
import IQuotedProduct from '../../../types/IQuotedProduct';
import { SpinnerBlock } from '../../LoadingAnimation/SpinnerBlock';
import { CustomAlert } from '../../Alerts/CustomAlert';
import { Search } from 'react-bootstrap-icons';
import { DebounceInput } from 'react-debounce-input';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import './AddSimpleQuoteModal.css';

interface AddSimpleQuoteModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    modalVisible: boolean;
    selectedProduct: IProduct;
    getAllQuotes: () => void;
}

const customTotal = (from: number, to: number, size: number) => (
    <span className="react-bootstrap-table-pagination-total" style={{ marginLeft: 5 }}>
        {size} Results
    </span>
);

const paginationOptions = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
};

const companyTableColumns: ColumnDescription<ICompany>[] = [
    { dataField: 'type', text: 'Type', sort: true },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'representative', text: 'Representative', sort: true },
    { dataField: 'phone', text: 'Phone Number', sort: false, headerAlign: 'center' },
    { dataField: 'email', text: 'Email', sort: false, headerAlign: 'center' },
    { dataField: 'location', text: 'Location', sort: false },
    { dataField: 'comments', text: 'Comments', sort: false },
];

const handleSearch = (input: string, searchProps: { onSearch: (value: string) => void; }) => {
    if (input !== undefined) {
        searchProps.onSearch(input);
    }
};

const AddSimpleQuoteModalComponent: FunctionComponent<AddSimpleQuoteModalProps> = (props) => {
    const [companyList, setCompanyList] = useState<ICompany[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(defaultAlert);
    const [quote, setQuote] = useState<IQuote>(defaultQuote);
    const [quotedProduct, setQuotedProduct] = useState<IQuotedProduct>(defaultQuotedProduct);

    const getCompanyList = async () => {
        setCompanyList(await requestAllCompanies());
    };

    const selectRow: SelectRowProps<ICompany> = {
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
            if (quotedProduct.productCondition === '' || quotedProduct.productCondition === 'Condition' || quotedProduct.quantity === 0 || quotedProduct.quotedPrice === 0) {
                setAlert({ label: 'Missing Required Information!', show: true, type: 'danger' });
            } else if (!quote.companyId) {
                setAlert({ label: 'Please Select a Company', show: true, type: 'danger' });
            } else {
                try {
                    const finalQuote: IQuote = {
                        ...quote,
                        quotedProducts: [{ ...quotedProduct, productId: props.selectedProduct.id as number }],
                    };
                    await requestAddQuote(finalQuote);
                    props.getAllQuotes();
                    props.onClose();
                } catch (err) {
                    setAlert({ label: `${err}`, show: true, type: 'danger' });
                } finally {
                    setIsSaving(false);
                }
            }

            if (alert.show) {
                setIsSaving(false);
                setTimeout(() => setAlert(defaultAlert), 3000);
            }
        }, 500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumericField = ['quantity', 'quotedPrice'].includes(id);

        if (['sold', 'dateQuoted'].includes(id)) {
            const newQuoteValue = id === 'sold' ? value === 'true' : new Date(value);
            setQuote(prev => ({ ...prev, [id]: newQuoteValue }));
        } else {
            setQuotedProduct(prev => ({
                ...prev,
                [id]: isNumericField ? (value === '' ? 0 : parseFloat(value)) : value,
            }));
        }
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <div>
            <Modal backdrop="static" show={props.modalVisible} onHide={props.onClose} fullscreen={true}>
                <Modal.Header className="modal-header-simple-quote" closeButton>
                    <Modal.Title>
                        <h2 className="modal-title-simple-quote">Quick Quote</h2>
                        <p className="modal-subtitle-simple-quote">Please enter quote information.</p>
                        <p className={'required-text'}>Required *</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-simple-quote">
                    <div className='container d-grid gap-2 container-simple-quote'>
                        {isSaving ?
                            <SpinnerBlock />
                            :
                            <Form className="container d-grid" >
                                <CustomAlert label={alert.label} type={alert.type} showAlert={alert.show} />
                                <Form.Group className="mb-3">
                                    <Form.Label>Condition<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Select
                                        id="productCondition"
                                        aria-label="Condition"
                                        value={quotedProduct.productCondition}
                                        onChange={handleInputChange}
                                    >
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
                                        id="quantity" type="number" placeholder="Quantity"
                                        value={quotedProduct.quantity === 0 ? '' : quotedProduct.quantity}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="quotedPrice" type="number" placeholder="Price"
                                        value={quotedProduct.quotedPrice === 0 ? '' : quotedProduct.quotedPrice}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date<Form.Label className={'required-text-asterisk'}>*</Form.Label></Form.Label>
                                    <Form.Control
                                        id="dateQuoted" type="date"
                                        value={quote.dateQuoted ? new Date(quote.dateQuoted).toISOString().split("T")[0] : ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sold</Form.Label>
                                    <InputGroup>
                                        <div>
                                            <Form.Check
                                                inline
                                                label="Yes"
                                                name='sold'
                                                type={'radio'}
                                                id="sold-yes"
                                                value="true"
                                                checked={quote.sold === true}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Check
                                                inline
                                                label="No"
                                                name='group2'
                                                id="sold-no"
                                                value="false"
                                                checked={quote.sold === false}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                        id="comment" as="textarea" placeholder="Comments"
                                        value={quotedProduct.comment}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3">
                                    <Form.Label>Select a Company</Form.Label>
                                    <div>
                                        <div>
                                            <ToolkitProvider
                                                keyField="id"
                                                data={companyList || []}
                                                columns={companyTableColumns}
                                                search >
                                                {
                                                    searchProps => (
                                                        <div>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text id="basic-addon2">
                                                                    <Search />
                                                                </InputGroup.Text>
                                                                <DebounceInput
                                                                    type="text"
                                                                    className='debounce form-control'
                                                                    placeholder="Search..."
                                                                    debounceTimeout={500}
                                                                    onChange={e => handleSearch(e.target.value, searchProps.searchProps)}
                                                                />
                                                            </InputGroup>

                                                            <BootstrapTable
                                                                {...searchProps.baseProps}
                                                                keyField="id"
                                                                bootstrap4
                                                                condensed
                                                                striped
                                                                hover
                                                                selectRow={selectRow as SelectRowProps<ICompany>}
                                                                pagination={paginationFactory(paginationOptions)}
                                                                classes="table table-dark table-hover table-striped"
                                                                noDataIndication='TABLE IS EMPTY'
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </ToolkitProvider>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-simple-quote">
                    <div className="w-100 footer-button-container-simple-quote">
                        <Button variant="dark" onClick={submitQuote}>
                            Finish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const AddSimpleQuoteModal = withRouter(AddSimpleQuoteModalComponent);