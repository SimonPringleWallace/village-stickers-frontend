import React, { useState } from 'react';
import { stickers } from '../assets/states';
import Header from '../header/header';
import StickerCard from '../product-card/Card';


const Home = () => {
    const [ order, updateOrder ] = useState({});

    const onAddToCart = (type: string, quantity: string) => {
        updateOrder({
            ...order,
            [type]: quantity
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