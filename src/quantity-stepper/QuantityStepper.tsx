import React from 'react';
import { Input, Button } from 'semantic-ui-react'

interface QuantityStepperProps {
    quantity: number;
    tagKey: string;
    onUpdateQuantity(tagKey: string, direction: 'increment' | 'decrement'): void
}

const QuanityStepper = ({ onUpdateQuantity, quantity, tagKey }: QuantityStepperProps) => {
    return(
        <Input type='text' style={{height: '30px'}}>
            <Button onClick={() => onUpdateQuantity(tagKey, 'decrement')} style={{margin: '0px', borderRadius: '4px 0px 0px 4px', padding: '8px'}}>-</Button>
            <input value={quantity} style={{borderRadius: '0px', width: '50px', textAlign: 'center'}} />
            <Button onClick={() => onUpdateQuantity(tagKey, 'increment')} style={{borderRadius: '0px 4px 4px 0px', padding: '8px'}}>+</Button>
        </Input>
    )
}

export default QuanityStepper;