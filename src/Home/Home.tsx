import React, { useState } from 'react';
import { stickers } from '../assets/states';
import Header from '../header/header';
import StickerCard from '../product-card/Card';
import { Sidebar, Menu, Header as SemanticHeader, Button } from 'semantic-ui-react';
import CartItem from '../cart-item/CartItem';


const Home = () => {
    const [ order, updateOrder ] = useState({} as {[type: string]: string});
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const onAddToCart = (type: string, quantity: string) => {
        const newOrder = {...order} as {[type: string]: string}
        
        if(order[type] != null) {
            console.log(order[type], quantity)
            // todo this parseInt is ridiculous, just pass numbers not strings
            newOrder[type] = (parseInt(order[type]) + parseInt(quantity)).toString()
        }
        else {
            newOrder[type] = quantity
        }
        updateOrder({
            ...newOrder
        })
        if(!isSidebarVisible) {
            setIsSidebarVisible(true)
        }
    }

    const createStickerCards = () => {
        return stickers.map((sticker) => (
            <StickerCard
                key={sticker.name}
                name={sticker.name}
                unit={sticker.quantity}
                description={sticker.description}
                color={sticker.color}
                onAddToCart={onAddToCart}
            />
        ))
    }

    const onCloseSidebar = () => {
        setIsSidebarVisible(false)
    }


    return (
        <>
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
                <Button onClick={onCloseSidebar} style={{background: 'none', fontSize: '26px', fontWeight: 100, height: 40, width: 40, padding: 0}}>X</Button>
            </div>
            {Object.keys(order).map((orderItem, i) => (
                <CartItem/>
            ))}
            <Button> Checkout</Button>
          </Sidebar>
        </> 
    );
}

export default Home;