
import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedProductRow } from '../../components/ExpandedProductRow/ExpandedProductRow';
import { ProductModal } from '../../components/ProductModal/ProductModal';
import IProduct from '../../types/IProduct';
import './Home.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { RemoveProductModal } from '../../components/RemoveProductModal/RemoveProductModal';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/API';
import { PAGE_ROUTES } from '../../constants/PageRoutes';
import { clearCookie } from '../../utils/Auth';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    loggedIn: boolean;

    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomeLayout: FunctionComponent<HomeProps> = ({ history, loggedIn, setLoggedIn }) => {
    const [addProductSwitch, setAddProductSwitch] = useState(false);
    const [editProductSwitch, setEditProductSwitch] = useState(false);
    const [removeProductSwitch, setRemoveProductSwitch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [filterType, setFilterType] = useState('Filter Type');
    const [filterBrand, setFilterBrand] = useState('Filter Brand');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct>({
        id: 0,
        productNumber: '',
        userId: 0,
        altNumber1: '',
        altNumber2: '',
        altNumber3: '',
        altNumber4: '',
        altNumber5: '',
        altNumber6: '',
        quantity: 0,
        productType: '',
        brand: '',
        description: '',
        ebayLink: '',
        websiteLink: '',
        quickSpecsLink: '',
        relatedTags: '',
    });
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
                <div onClick={(e) => {
                    setRemoveProductSwitch(true);
                    setSelectedProduct(data)
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
                    setEditProductSwitch(true);
                    setSelectedProduct(data)
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
            dataField: "quantity",
            text: "QTY",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 2,
            dataField: "productNumber",
            text: "Product Number",
            sort: true,
        },
        {
            id: 7,
            dataField: "productType",
            text: "Type",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 8,
            dataField: "brand",
            text: "Brand",
            sort: true,
            headerAlign: 'center',
        },
        {
            id: 9,
            dataField: "description",
            text: "Description",
            sort: false,
        },
        {
            id: 12,
            dataField: "lastAdded",
            text: "Last Added",
            sort: true,
        },
        {
            id: 10,
            dataField: "edit",
            text: "Edit",
            sort: false,
            formatter: rankFormatterEdit,
            headerAlign: 'center',
        },
        {
            id: 11,
            dataField: "remove",
            text: "Remove",
            sort: false,
            formatter: rankFormatterRemove,
            headerAlign: 'center',
        }

    ];

    const OnTypeChange = (props: any) => {
        const handleSearch = (input: string) => {
            props.onSearch(input);
        };
        return (
            <DropdownButton
                variant="dark"
                menuVariant="dark"
                title={filterType}
                style={{ marginRight: 5 }}
                onSelect={(e) => {
                    if (e != null) {
                        if (e == 'Clear') {
                            handleSearch('');
                        } else {
                            handleSearch(e);
                        }
                    }
                }}
            >
                <Dropdown.Item eventKey="CPU">CPU</Dropdown.Item>
                <Dropdown.Item eventKey="Memory">Memory</Dropdown.Item>
                <Dropdown.Item eventKey="SSD">SSD</Dropdown.Item>
                <Dropdown.Item eventKey="HDD">HDD</Dropdown.Item>
                <Dropdown.Item eventKey="Clear">Clear</Dropdown.Item>
            </DropdownButton >
        );

    };

    const getAllProducts = () => {
        setTimeout(() => {
            axios.get(`${BASE_API_URL}products`, { withCredentials: true })
                .then((response) => {
                    setProductList(response?.data?.payload);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 400)
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const logout = () => {
        setTimeout(() => {
            axios.get(`${BASE_API_URL}users/logout`, { withCredentials: true })
                .then((response) => {
                    history.replace(PAGE_ROUTES.LOGIN);
                    clearCookie();
                    setLoggedIn(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 400)
    };
    const options = {
        custom: true,
        totalSize: productList.length,
    };
    return (
        <section className="text-white main-section overflow-auto">
            <div style={{ padding: 20 }}>
                <ToolkitProvider
                    keyField="id"
                    data={productList}
                    columns={column}
                    search
                >
                    {
                        props => (
                            <div className='d-flex justify-content-between'>
                                <h2 style={{ fontWeight: 300 }}>Products</h2>
                                <div>
                                    <Button variant="dark" style={{ marginRight: 5 }}>Export to CSV</Button>
                                    <Button variant="dark" onClick={() => { setAddProductSwitch(true) }}>
                                        <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />New Product
                                    </Button>
                                    <Button variant="dark" style={{ marginRight: 5 }} onClick={e => logout()}>
                                        Logout
                                    </Button>
                                </div>
                                <hr style={{ marginBottom: 20, height: 3, borderRadius: 5, border: 1 }} />
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <DebounceInput
                                            type='input'
                                            value={searchText}
                                            className="form-control custom-input"
                                            placeholder="Search Product"
                                            minLength={1}
                                            style={{ width: 200, marginRight: 10 }}
                                            debounceTimeout={300}
                                            onChange={(e) => {
                                                setIsSearching(true);
                                            }}
                                        />
                                    </div>
                                    <div className='d-flex'>
                                        <Button variant="dark" style={{ marginRight: 5 }}
                                            onClick={() => {
                                                setFilterBrand('Filter Brand');
                                                setFilterType('Filter Type');
                                                setProductList(productList);
                                                setSearchText('');
                                            }}
                                        >
                                            Clear Filters
                                        </Button>
                                        <DropdownButton
                                            variant="dark"
                                            menuVariant="dark"
                                            title={filterBrand}
                                            style={{ marginRight: 5 }}
                                            onSelect={(e) => {
                                                if (e !== null) {
                                                    if (e.toLowerCase() === 'clear') {
                                                        setProductList(productList); setFilterBrand('Filter Brand');
                                                    } else {
                                                        setProductList(productList.filter(product => product.brand.toLowerCase().includes(e.toLowerCase())));
                                                        setFilterBrand(e);
                                                    }
                                                    console.log(e);
                                                }
                                            }}
                                        >
                                            <Dropdown.Item eventKey="HPE">HPE</Dropdown.Item>
                                            <Dropdown.Item eventKey="Dell">Dell</Dropdown.Item>
                                            <Dropdown.Item eventKey="Cisco">Cisco</Dropdown.Item>
                                            <Dropdown.Item eventKey="Lenovo">Lenovo</Dropdown.Item>
                                            <Dropdown.Item eventKey="IBM">IBM</Dropdown.Item>
                                            <Dropdown.Item eventKey="Clear">Clear</Dropdown.Item>
                                        </DropdownButton>

                                        <DropdownButton
                                            variant="dark"
                                            menuVariant="dark"
                                            title={filterType}
                                            style={{ marginRight: 5 }}
                                            onSelect={(e) => {
                                                if (e !== null) {

                                                }
                                            }}
                                        >
                                            <Dropdown.Item eventKey="CPU">CPU</Dropdown.Item>
                                            <Dropdown.Item eventKey="Memory">Memory</Dropdown.Item>
                                            <Dropdown.Item eventKey="SSD">SSD</Dropdown.Item>
                                            <Dropdown.Item eventKey="HDD">HDD</Dropdown.Item>
                                            <Dropdown.Item eventKey="Clear">Clear</Dropdown.Item>
                                        </DropdownButton>

                                        <DropdownButton
                                            key={'dark'}
                                            variant="dark"
                                            menuVariant="dark"
                                            title={'Search History '}
                                            onSelect={(e) => {
                                                if (e !== null) {

                                                }
                                            }}
                                        >
                                            {
                                                searchHistory.length > 0 ?
                                                    searchHistory.map((o) => {
                                                        return <Dropdown.Item eventKey={o}>{o}</Dropdown.Item>
                                                    })
                                                    :
                                                    <Dropdown.Item eventKey='1'>No History</Dropdown.Item>
                                            }
                                        </DropdownButton>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    {isSearching ?
                                        <div className='spinnerDiv'>
                                            <Spinner
                                                animation="border" role="status" />
                                            <ul>

                                                <li style={{ listStyle: 'none' }}>

                                                </li>
                                                <li style={{ listStyle: 'none' }}>
                                                    <label>Loading Data Table...</label>
                                                </li>
                                            </ul>
                                        </div>
                                        :
                                        <div>
                                            <BootstrapTable
                                                {...props.baseProps}
                                                bootstrap4
                                                striped
                                                hover
                                                noDataIndication='TABLE IS EMPTY'
                                                pagination={paginationFactory(options)}
                                                classes="table table-dark table-hover table-striped table-responsive"
                                                expandRow={{
                                                    onlyOneExpanding: true,
                                                    renderer: (row, index) => {
                                                        return (
                                                            <ExpandedProductRow
                                                                selectedProduct={row} />
                                                        );
                                                    }
                                                }} />
                                        </div>}
                                </div>
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>

            {
                addProductSwitch &&
                <div className='modal-dialog'>
                    <ProductModal
                        modalVisible={addProductSwitch}
                        modalSwitch={0}
                        selectedProduct={{
                            id: 0,
                            productNumber: '',
                            userId: 0,
                            altNumber1: '',
                            altNumber2: '',
                            altNumber3: '',
                            altNumber4: '',
                            altNumber5: '',
                            altNumber6: '',
                            quantity: 0,
                            productType: '',
                            brand: '',
                            description: '',
                            ebayLink: '',
                            websiteLink: '',
                            quickSpecsLink: '',
                            relatedTags: '',
                        }}
                        getAllProducts={getAllProducts}
                        onClose={async () => {
                            setAddProductSwitch(false);
                        }}
                    />
                </div>
            }
            {
                editProductSwitch &&
                <div className='modal-dialog'>
                    <ProductModal
                        modalVisible={editProductSwitch}
                        modalSwitch={1}
                        selectedProduct={selectedProduct}
                        getAllProducts={getAllProducts}
                        onClose={async () => {
                            setEditProductSwitch(false);
                        }}
                    />
                </div>
            }
            {/* hEATING UP FOOD BRB */}
            {
                removeProductSwitch &&
                <div className='modal-dialog'>
                    <RemoveProductModal
                        modalVisible={removeProductSwitch}
                        selectedProduct={selectedProduct}
                        getAllProducts={getAllProducts}
                        onClose={async () => {
                            setRemoveProductSwitch(false);
                        }}
                    />
                </div>
            }
        </section >
    );
};

export const Home = withRouter(HomeLayout);
