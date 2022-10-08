import React from 'react';
import { Icon } from 'semantic-ui-react';

const style = {
    height: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
}

interface HeaderProps {
    order: {
        [type: string]: string
    }
}

const Header = ({ order }: HeaderProps) => {

    const getCartNumber = () => {

        const cartItems = Object.values(order).reduce((acc, curr) => acc + parseInt(curr), 0)
        
        if(cartItems === 0) {
            return ''
        }
        return cartItems.toString()
    }
    const cartNumber = getCartNumber()
    return (
        <div style={style}>
            <div>Red Hook Village Trash Stickers</div>
            <div style={{display: 'flex'}}>
                <Icon name="shopping cart"></Icon>
                {(parseInt(cartNumber) > 0) && <div style={{backgroundColor: 'red', height: '15px', width: '15px', borderRadius: '10px', marginTop: '-3px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px'}}>
                    {getCartNumber()}
                </div>}
            </div>
        </div>
    );
}

export default Header;
