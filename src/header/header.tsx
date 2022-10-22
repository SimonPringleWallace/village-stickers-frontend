import React from 'react';
import { useNavigate } from 'react-router';
import { Icon } from 'semantic-ui-react';
import { IOrder } from '../interfaces';
import RedHook from '../assets/hook.png';
import './header.css'

interface HeaderProps {
    withCart?: boolean;
    order?: IOrder;
    onCartClick?(): void;
}

const cartStyle = {
    display: 'flex',
    ':hover': {
        cursor: 'pointer'
    }
}

const Header = ({ order, onCartClick, withCart=true }: HeaderProps) => {
const navigate = useNavigate();
    const getCartNumber = () => {
        if(!order) {
            return '0';
        }
        const cartItems = Object.values(order).reduce((acc, curr) => acc + curr.quantity, 0)
        
        if(cartItems === 0) {
            return ''
        }
        return cartItems.toString()
    }
    const cartNumber = getCartNumber()
    return (
        <div className='header-container'>
            <div className="home-icon-container">
            <img className='red-hook' src={RedHook}/>
                <div className='home-icon' onClick={() => navigate('/')}>
                    Red Hook Village Trash Tags
                </div>
            </div>
            <div style={cartStyle} onClick={onCartClick}>
                {withCart && <Icon size='large' style={{cursor: 'pointer'}} name="shopping cart"></Icon>}
                {(parseInt(cartNumber) > 0) && <div style={{backgroundColor: 'red', height: '15px', width: '15px', borderRadius: '10px', marginTop: '-3px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px'}}>
                    {getCartNumber()}
                </div>}
            </div>
        </div>
    );
}

export default Header;
