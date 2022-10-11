import React, {useContext} from 'react';
import { Card } from 'semantic-ui-react'
import { TagContext } from '../Home/Home';
import QuanityStepper from '../quantity-stepper/QuantityStepper';

interface CartItemProps {
    quantity: number;
    tagKey: string;
    onUpdateQuantity( tagKey: string, direction: 'increment' | 'decrement'): void
    onRemoveCartItem(tagKey: string): void
}

const CartItem = ({ onUpdateQuantity, quantity, tagKey, onRemoveCartItem }: CartItemProps) => {
    const tags = useContext(TagContext)
    console.log('tags', tags)
    const price = tags.find((tag) => tag.title == tagKey)?.price ?? 0
    return(
            <Card fluid>
                <Card.Content textAlign='left' style={{display: 'flex'}}>
                    <div>
                        <Card.Header content={tagKey} />
                        <Card.Meta content='Sheet of 6' />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Card.Header style={{marginLeft: '140px'}} content={`$${(quantity * price).toFixed(2)}`} />        
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <QuanityStepper tagKey={tagKey} quantity={quantity} onUpdateQuantity={onUpdateQuantity}/>
                        <p onClick={() => onRemoveCartItem(tagKey)} style={{marginLeft: '20px', color:'red', cursor: 'pointer'}}>remove</p>       
                    </div>
                </Card.Content>
            </Card>
    );
}

export default CartItem;