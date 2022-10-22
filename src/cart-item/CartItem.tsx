import React, {useContext} from 'react';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import { TagContext } from '../Home/Home';
import QuanityStepper from '../quantity-stepper/QuantityStepper';

interface CartItemProps {
    quantity: number;
    productId: string;
    onUpdateQuantity( tagKey: string, direction: 'increment' | 'decrement'): void
    onRemoveCartItem(tagKey: string): void
}

const CartItem = ({ onUpdateQuantity, quantity, productId, onRemoveCartItem }: CartItemProps) => {
    const tags = useContext(TagContext)
    const {price, title } = tags.find((tag) => tag.id == productId) ?? {}
    return(
            <Card fluid>
                <Card.Content textAlign='left' style={{display: 'flex'}}>
                    <div>
                        <Card.Header content={title} />
                        <Card.Meta content='Sheet of 6' />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Card.Header style={{marginLeft: '140px'}} content={`$${(quantity * (price ?? 1)).toFixed(2)}`} />        
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <QuanityStepper tagKey={productId} quantity={quantity} onUpdateQuantity={onUpdateQuantity}/>
                        <p onClick={() => onRemoveCartItem(productId)} style={{marginLeft: '20px', color:'red', cursor: 'pointer'}}>remove</p>       
                    </div>
                </Card.Content>
            </Card>
    );
}

export default CartItem;