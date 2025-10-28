import React, { FunctionComponent } from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Row, Col, Nav } from 'react-bootstrap';
import IProduct from '../../../../types/IProduct';
import { PAGE_ROUTES } from '../../../../constants/PageRoutes';
import { BoxSeam, CheckCircleFill, Link45deg, ListTask, Plus } from 'react-bootstrap-icons';

interface LocationState {
    product?: IProduct;
}

const NewProductSuccessLayout: FunctionComponent<RouteComponentProps<{}, {}, LocationState>> = (props) => {
    const history = useHistory();
    const product = props.location.state?.product;

    const altNumbers = product ? Array.from({ length: 6 }, (_, i) => product[`altNumber${i + 1}` as keyof IProduct]).filter(Boolean) : [];

    const handleCreateAnother = () => {
        history.push(PAGE_ROUTES.NEW_PRODUCT);
    };

    const handleViewAll = () => {
        history.push({
            pathname: PAGE_ROUTES.HOME,
            state: { newProductNumber: product?.productNumber }
        });
    };

    return (
        <section className="text-white main-section overflow-auto">
            <Container className="py-4">

                <div className="d-flex align-items-center" style={{ marginBottom: 50 }}>
                    <div style={{
                        backgroundColor: 'rgba(40, 167, 69, 0.2)',
                        borderRadius: '50%',
                        padding: '1rem',
                        display: 'inline-block',
                    }}>
                        <CheckCircleFill size={48} color="#28a745" />
                    </div>
                    <div className="ms-3 mt-2">
                        <h1 className="h3 mb-0">Product Created Successfully!</h1>
                        <p className="text-muted mb-0">Your product has been added to the inventory.</p>
                    </div>
                </div>

                <div
                    className="rounded d-flex mb-4"
                    style={{ backgroundColor: '#2c3034', border: '1px solid rgba(40, 167, 69, 0.2)', minWidth: '130px', flexDirection: 'column' }}
                >
                    <div className="mb-1" style={{ background: 'linear-gradient(to bottom, rgba(40, 167, 69, 0.2), transparent)', padding: '1rem', borderRadius: '0.25rem' }}>
                        <div className="d-flex align-items-center mb-2">
                            <BoxSeam size={25} />
                            <h5 className="mb-0 ms-3" style={{ fontWeight: 300 }}>Basic Information</h5>
                        </div>
                        <p className="text-muted">Review the product you just created</p>
                    </div>
                    <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 5, display: 'flex', flexDirection: 'row', gap: '300px' }}>
                        <div>
                            <div>
                                <p className="text-secondary mb-1">Product Number</p>
                                <p>{product?.productNumber}</p>
                            </div>
                            <div>
                                <p className="text-secondary mb-1">Brand</p>
                                <p>{product?.productNumber}</p>
                            </div>
                            <div>
                                <p className="text-secondary mb-1">Description</p>
                                <p>{product?.productNumber}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="text-secondary mb-1">Product Type</p>
                                <p>{product?.description}</p>
                            </ div>
                            {product?.relatedTags &&
                                <div>
                                    <p className="text-secondary mb-1">Tags</p>
                                    <p>{product?.relatedTags}</p>
                                </div>
                            }
                        </div>
                    </div>
                    {altNumbers.length > 0 && (
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 5 }}>
                            <p className="text-secondary mb-2">Alternative Numbers</p>
                            <Row>
                                {altNumbers.map((altNumber, idx) => (
                                    <Col md={4} key={idx} className="mb-3">
                                        <p className="mb-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem', borderRadius: '0.25rem' }}>
                                            {altNumber}
                                        </p>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                    {(product?.ebayUrl || product?.websiteUrl || product?.quickSpecsUrl) && (
                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 5 }}>
                            <div>
                                <p className="text-secondary mb-1">Links</p>
                            </div>
                            {product.ebayUrl &&
                                <div className="d-flex align-items-center mb-2">
                                    <Nav.Link style={{ color: 'rgb(44 84 207)' }}
                                        onClick={() => {
                                            window.open(product.ebayUrl, "_blank", 'noopener,noreferrer')
                                        }}>
                                        <Link45deg size={25} />    Ebay Listing
                                    </Nav.Link>
                                </div>
                            }
                            {product.websiteUrl &&
                                <div className="d-flex align-items-center mb-2">
                                    <Nav.Link style={{ color: 'rgb(44 84 207)' }}
                                        onClick={() => {
                                            window.open(product.websiteUrl, "_blank", 'noopener,noreferrer')
                                        }}>
                                        <Link45deg size={25} />    Website Listing
                                    </Nav.Link>
                                </div>
                            }
                            {product.quickSpecsUrl &&
                                <div className="d-flex align-items-center mb-2">
                                    <Nav.Link style={{ color: 'rgb(44 84 207)' }}
                                        onClick={() => {
                                            window.open(product.quickSpecsUrl, "_blank", 'noopener,noreferrer')
                                        }}>
                                        <Link45deg size={25} />    Quick Specs
                                    </Nav.Link>
                                </div>
                            }
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center" style={{ gap: '20px' }}>
                    <div>
                        <Button variant="dark" onClick={handleCreateAnother}>
                            <Plus height="25" width="25" style={{ marginTop: -3, marginLeft: -10 }} />Create Another Product
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline-light" onClick={handleViewAll}>
                            <ListTask height="25" width="25" style={{ marginRight: 5 }} />View All Products
                        </Button>
                    </div>
                </div>
            </Container>
        </section >
    );
};

export const NewProductSuccess = withRouter(NewProductSuccessLayout);