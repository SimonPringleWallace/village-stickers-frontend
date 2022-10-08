import React from 'react';
import { Menu, Card } from 'semantic-ui-react'
import QuanityStepper from '../quantity-stepper/QuantityStepper';

const CartItem = () => {
    return(
            <Card fluid>
                <Card.Content textAlign='left' style={{display: 'flex'}}>
                    <div>
                        <Card.Header content='Red Trash Tags' />
                        <Card.Meta content='Sheet of 6' />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Card.Header style={{marginLeft: '140px'}} content='$38.00' />        
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <QuanityStepper/>
                        <p style={{marginLeft: '20px', color:'red'}}>remove</p>       
                    </div>
                </Card.Content>
            </Card>
    );
}

export default CartItem;