import React, { useContext, useState } from 'react';
import { Sidebar, Menu, Button, Header } from 'semantic-ui-react';
import CartItem from '../cart-item/CartItem';
import { ITag } from '../Home/interfaces';
import { IOrder } from '../interfaces';
import { orderContext } from '../state/orderContext';
import postData from './cartUtils';


interface ICartProps {
    isSidebarVisible: boolean;
    stickers: ITag[];
    hasCheckoutBtn: boolean;
    isCloseable?: boolean;
    onHide?: () => void;
}

const Cart = ({ isSidebarVisible, onHide, stickers, hasCheckoutBtn, isCloseable = true }: ICartProps) => {
    const { order, setCurrentOrder } = useContext(orderContext)
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    
    const onUpdateQuantity = (id: string, direction: 'increment' | 'decrement') => {

        if(direction === 'increment') {
            setCurrentOrder({
                ...order,
                [id]: {
                    ...order[id],
                    quantity: order[id].quantity + 1
                }
            })
        }
        else if (order[id].quantity > 0) {
            setCurrentOrder({
                ...order,
                [id]: {
                    ...order[id],
                    quantity: order[id].quantity - 1
                }
            })
        }
    }

    const removeCartItem = (id: string) => {
        const newOrder = {} as IOrder
        Object.keys(order).forEach((productId) => {
            if (productId !== id) {
                newOrder[id] = {...order[id]}
            }
        })
        setCurrentOrder(newOrder)
    }

    const calculateOrderTotal = () => {
        if(stickers.length === 0) {
            return;
        }
        let total = 0;
        Object.keys(order).forEach((productId: string) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            total += stickers.find((tag) => tag.id == productId)!.price * order[productId].quantity
        })
    
        return (total).toFixed(2);
    }
    const onClickCheckout = () => {
        setIsCheckoutLoading(true)
        postData(order, stickers)
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
            {Object.keys(order).map((productId, i) => (
                <CartItem key={i} productId={productId} quantity={order[productId].quantity} onUpdateQuantity={onUpdateQuantity} onRemoveCartItem={removeCartItem}/>
            ))}

            <Header style={{marginRight: 10}} textAlign='right' size='medium'>Total</Header>
            <Header style={{margin: 0, marginRight: 10}} textAlign='right' size='small'>{`$${calculateOrderTotal()}`}</Header>
            {hasCheckoutBtn && <Button loading={isCheckoutLoading} color="blue" onClick={onClickCheckout}>Checkout</Button>}
        </Sidebar>
    )
}

export default Cart;