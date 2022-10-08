import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react'

const QuanityStepper = () => {
    const [quantity, setQuantity] = useState(1);

    const onClickQuantity = (direction: 'up' | 'down') => {
        if(direction === 'up') {
            setQuantity(quantity + 1)
        }
        else {
            setQuantity(quantity - 1)
        }
    }

    return(
        <Input type='text' style={{height: '30px'}}>
            <Button onClick={() => onClickQuantity('down')} style={{margin: '0px', borderRadius: '4px 0px 0px 4px', padding: '8px'}}>-</Button>
            <input value={quantity} style={{borderRadius: '0px', width: '50px', textAlign: 'center'}} />
            <Button onClick={() => onClickQuantity('up')} style={{borderRadius: '0px 4px 4px 0px', padding: '8px'}}>+</Button>
        </Input>
    )
}

export default QuanityStepper;