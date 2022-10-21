import React from 'react';
import { Icon } from 'semantic-ui-react';
import { IOrder } from '../interfaces';
import './header.css'

const style = {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
}

interface HeaderProps {
    order: IOrder;
    onCartClick(): void;
}

const cartStyle = {
    display: 'flex',
    ':hover': {
        cursor: 'pointer'
    }
}

const Header = ({ order, onCartClick }: HeaderProps) => {

    const getCartNumber = () => {

        const cartItems = Object.values(order).reduce((acc, curr) => acc + curr.quantity, 0)
        
        if(cartItems === 0) {
            return ''
        }
        return cartItems.toString()
    }
    const cartNumber = getCartNumber()
    return (
        <div className='header-container'>
            <div className='home-icon'>
                Red Hook Village Trash Stickers
            </div>
            <div style={cartStyle} onClick={onCartClick}>
                <Icon size='large' style={{cursor: 'pointer'}} name="shopping cart"></Icon>
                {(parseInt(cartNumber) > 0) && <div style={{backgroundColor: 'red', height: '15px', width: '15px', borderRadius: '10px', marginTop: '-3px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px'}}>
                    {getCartNumber()}
                </div>}
            </div>
        </div>
    );
}

export default Header;
