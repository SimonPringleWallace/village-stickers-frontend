import React from 'react';
import { stickers } from '../assets/states';
import Header from '../header/header';
import StickerCard from '../product-card/Card';


const Home = () => {
    // header with logo and cart on either side
    // ecom tickets with product info
    // should add apollo for a ch
    const createStickerCards = () => {
        return stickers.map((sticker) => (
            <StickerCard
                name={sticker.name}
                quantity={sticker.quantity}
                description={sticker.description}
                color={sticker.color}
            />
        ))
    }


    return (
        <>
        <Header/>
        {createStickerCards()}
        </> 
    );
}

export default Home;