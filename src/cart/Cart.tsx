import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar, Menu, Button, Icon, Header } from 'semantic-ui-react';
import CartItem from '../cart-item/CartItem';
import { ITag } from '../Home/interfaces';
import { IOrder } from '../interfaces';
import { orderContext } from '../state/orderContext';


interface ICartProps {
    isSidebarVisible: boolean;
    stickers: ITag[];
    hasCheckoutBtn: boolean;
    isCloseable?: boolean;
    onHide?: () => void;
}

const Cart = ({ isSidebarVisible, onHide, stickers, hasCheckoutBtn, isCloseable = true }: ICartProps) => {
    const { order, setCurrentOrder } = useContext(orderContext)
    const navigate = useNavigate();
    
    const onUpdateQuantity = (tagKey: string, direction: 'increment' | 'decrement') => {
    const currValue = order[tagKey];


        if(direction === 'increment') {
            setCurrentOrder({
                ...order,
                [tagKey]: currValue + 1
            })
        }
        else if (order[tagKey] > 0) {
            setCurrentOrder({
                ...order,
                [tagKey]: currValue - 1
            })
        }
    }

    const removeCartItem = (tagKey: string) => {
        const newOrder = {} as IOrder
        Object.keys(order).forEach((key) => {
            if (key !== tagKey) {
                newOrder[key] = order[tagKey]
            }
        })
        setCurrentOrder(newOrder)
    }

    const calculateOrderTotal = () => {
        if(stickers.length === 0) {
            return;
        }
        let total = 0;
        console.log('order', order)
        Object.keys(order).forEach((key) => {
            total += stickers.find((tag) => tag.title == key)!.price * order[key]
        })
    
        return (total).toFixed(2);
    }

    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            direction='right'
            onHide={ onHide ? () => onHide() : undefined}
            vertical
            visible={isSidebarVisible}
            width='wide'
        >
            <div style={{display: 'flex', justifyContent:'space-between', marginTop: '20px', marginLeft: '20px'}}>
                <Header style={{margin: 0}} size='huge'> Cart</Header>
                {isCloseable && <Button onClick={onHide} style={{background: 'none', fontSize: '26px', fontWeight: 100, height: 40, width: 40, padding: 0}}>X</Button>}
            </div>
            {Object.keys(order).map((orderItem, i) => (
                <CartItem key={i} tagKey={orderItem} quantity={order[orderItem]} onUpdateQuantity={onUpdateQuantity} onRemoveCartItem={removeCartItem}/>
            ))}

            <Header style={{marginRight: 10}} textAlign='right' size='medium'>Total</Header>
            <Header style={{margin: 0, marginRight: 10}} textAlign='right' size='small'>{`$${calculateOrderTotal()}`}</Header>
            {hasCheckoutBtn && <Button onClick={() => navigate('/checkout')}>Checkout</Button>}
        </Sidebar>
    )
}

export default Cart;