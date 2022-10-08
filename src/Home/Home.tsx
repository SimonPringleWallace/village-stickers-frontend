import React, { useState } from 'react';
import { stickers } from '../assets/states';
import Header from '../header/header';
import StickerCard from '../product-card/Card';


const Home = () => {
    const [ order, updateOrder ] = useState({} as {[type: string]: string});

    const onAddToCart = (type: string, quantity: string) => {
        const newOrder = {...order} as {[type: string]: string}
        
        if(order[type] != null) {
            console.log(order[type], quantity)
            newOrder[type] = (parseInt(order[type]) + parseInt(quantity)).toString()
        }
        else {
            newOrder[type] = quantity
        }
        updateOrder({
            ...newOrder
        })
    }

    const createStickerCards = () => {
        return stickers.map((sticker) => (
            <StickerCard
                name={sticker.name}
                unit={sticker.quantity}
                description={sticker.description}
                color={sticker.color}
                onAddToCart={onAddToCart}
            />
        ))
    }


    return (
        <>
        <Header order={order}/>
        {createStickerCards()}
        </> 
    );
}

export default Home;