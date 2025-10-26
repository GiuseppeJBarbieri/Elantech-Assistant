import React, { FunctionComponent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import IQuotedProduct from '../../../types/IQuotedProduct';

interface AddProductFormProps {
    conditionList: string[];
    newQuotedProduct: IQuotedProduct;
    setNewQuotedProduct: React.Dispatch<React.SetStateAction<IQuotedProduct>>;
    onAdd: () => void;
}

export const AddProductForm: FunctionComponent<AddProductFormProps> = ({
    conditionList,
    newQuotedProduct,
    setNewQuotedProduct,
    onAdd,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const isNumericField = ['quantity', 'quotedPrice'].includes(id);

        setNewQuotedProduct(prev => ({
            ...prev,
            [id]: isNumericField ? (value === '' ? 0 : parseFloat(value)) : value,
        }));
    };

    return (
        <div className='add-product-form-container'>
            <div className='add-product-form-inner'>
                <div>
                    <Form.Label>Condition</Form.Label>
                    <Form.Select
                        id="productCondition"
                        aria-label="Condition"
                        value={newQuotedProduct.productCondition}
                        onChange={handleInputChange}
                    >
                        <option>Condition</option>
                        {conditionList.map(condition => (
                            <option key={condition} value={condition}>{condition}</option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        id="quantity" type="number" placeholder="QTY" style={{ width: 85 }}
                        value={newQuotedProduct.quantity === 0 ? '' : newQuotedProduct.quantity} onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        id="quotedPrice" type="number" placeholder="Price" style={{ width: 110 }}
                        value={newQuotedProduct.quotedPrice === 0 ? '' : newQuotedProduct.quotedPrice} onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        id="comment" type="text" placeholder="Comment" style={{ width: 400 }}
                        value={newQuotedProduct.comment} onChange={handleInputChange}
                    />
                </div>
                <div className="add-product-button-container">
                    <Button variant="dark" onClick={onAdd}><Plus style={{ marginTop: -3, marginLeft: -10 }} /> Add Quote</Button>
                </div>
            </div>
        </div>
    );
};