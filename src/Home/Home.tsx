import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/header';
import StickerCard from '../product-card/Card';
import { Sidebar, Menu, Header as SemanticHeader, Button, Icon, SemanticCOLORS, Popup } from 'semantic-ui-react';
import CartItem from '../cart-item/CartItem';
import { Navigate, useNavigate } from 'react-router';
import { ITag } from './interfaces';
import { useOrder } from '../hooks/useOrder';
import { IOrder } from '../interfaces';
import { orderContext } from '../state/orderContext';

export const TagContext = React.createContext([] as ITag[]);
const Home = () => {
    const { order, setCurrentOrder } = useContext(orderContext)
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [stickers, setStickers] = useState([] as ITag[]);
    const navigate = useNavigate(); // need to elevate order above home page so it's not lost when switching to checkout page

    const onAddToCart = (type: string, quantity: number) => {
        const newOrder = {...order} as IOrder
        
        if(order[type] != null) {
            newOrder[type] = order[type] + quantity;
        }
        else {
            newOrder[type] = quantity
        }
        setCurrentOrder({
            ...newOrder
        })
        if(!isSidebarVisible) {
            setIsSidebarVisible(true)
        }
    }

    const onUpdateQuantity = (tagKey: string, direction: 'increment' | 'decrement') => {
        const currValue = order[tagKey];

        console.log(currValue)
        console.log(typeof currValue)

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

    const createStickerCards = () => {
        return stickers.map((sticker) => (
            <StickerCard
                key={sticker.title}
                name={sticker.title}
                unit={sticker.unit}
                description={sticker.description}
                color={sticker.color as SemanticCOLORS}
                onAddToCart={onAddToCart}
                price={sticker.price}
            />
        ))
    }

    const onCloseSidebar = () => {
        setIsSidebarVisible(false)
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
        console.log('stickers', stickers)
        if(stickers.length === 0) {
            console.log('return')
            return;
        }
        let total = 0;
        console.log('order', order)
        Object.keys(order).forEach((key) => {
            total += stickers.find((tag) => tag.title == key)!.price * order[key]
        })
        return (total + 4).toFixed(2);
    }

    useEffect(() => {
        const fetchTags = async() => {
            const res = await fetch('http://localhost:8080/tags')
            const json = await res.json();
            setStickers(json)
        }
        fetchTags();
    }, [])

    return (
        <>
        <TagContext.Provider value={stickers}>
            <Header order={order} onCartClick={() => setIsSidebarVisible(!isSidebarVisible)}/>
            <div style={{height: '200px'}}></div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {createStickerCards()}
            </div>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                direction='right'
                onHide={() => setIsSidebarVisible(false)}
                vertical
                visible={isSidebarVisible}
                width='wide'
            >
                <div style={{display: 'flex', justifyContent:'space-between', marginTop: '20px', marginLeft: '20px'}}>
                    <SemanticHeader style={{margin: 0}} size='huge'> Cart</SemanticHeader>
                    <Button onClick={onCloseSidebar} style={{background: 'none', fontSize: '26px', fontWeight: 100, height: 40, width: 40, padding: 0}}><Icon name='close'/></Button>
                </div>
                {Object.keys(order).map((orderItem, i) => (
                    <CartItem key={i} tagKey={orderItem} quantity={order[orderItem]} onUpdateQuantity={onUpdateQuantity} onRemoveCartItem={removeCartItem}/>
                ))}
                <SemanticHeader size='tiny'>Convenience Fee: $4.00 <Popup content="Websites aren't free! This allows us to cover costs for payment processing and web hosting." trigger={<Icon style={{}} size='mini' name='info circle' />} /></SemanticHeader>

                <SemanticHeader style={{marginRight: 10}} textAlign='right' size='medium'>Total</SemanticHeader>
                <SemanticHeader style={{margin: 0, marginRight: 10}} textAlign='right' size='small'>{`$${calculateOrderTotal()}`}</SemanticHeader>
                <Button onClick={() => navigate('/checkout')}>Checkout</Button>
            </Sidebar>
        </TagContext.Provider>
        </> 
    );
}

export default Home;