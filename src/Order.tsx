import React, { ChangeEvent, useState } from 'react';
import { Select, Input, Container, DropdownProps, InputProps } from 'semantic-ui-react';

const stickerOptions = [
    { key: 'bl', value: 'blueSheet', text: 'Blue (sheet of 6)' },
    { key: 're', value: 'redSheet', text: 'Red (sheet of 6)' },
  ]

  // need to validate that we have a value for both

const Order = () => {
    const [stickerType, setStickerType ] = useState('');
    const [stickerQty, setStickerQty] = useState(0)

    const onCloseSelect = (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        setStickerType(data.value as string);
    }

    const onChangeQty = (event: ChangeEvent, data: InputProps) => {
        setStickerQty(data.value)

    }
    return (
        <>
            <p>What stickers do you need?</p>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Select
                    placeholder='Select your sticker type'
                    options={stickerOptions}
                    style={{marginRight: '10px'}}
                    closeOnChange={true}
                    onChange={onCloseSelect}
                    value={stickerType}
                />
                <Input 
                    type='number'
                    placeholder="Quantity..."
                    style={{width: '110px'}}
                    value={stickerQty === 0 ? '' : stickerQty}
                    onChange={onChangeQty}
                />
            </Container>
        </>
    )
}

export default Order;