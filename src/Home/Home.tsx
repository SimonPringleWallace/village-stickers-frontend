import React, { useContext, useEffect, useState } from 'react';
import Header from '../header/header';
import StickerCard from '../product-card/Card';
import { SemanticCOLORS } from 'semantic-ui-react';
import { ITag } from './interfaces';
import { IOrder } from '../interfaces';
import { orderContext } from '../state/orderContext';
import Cart from '../cart/Cart';
import TrashCan from '../assets/can_of_trash.png';
import './home.css';
import { tags } from '../tags';

export const TagContext = React.createContext([] as ITag[]);
const Home = () => {
    const { order, setCurrentOrder } = useContext(orderContext)
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [stickers, setStickers] = useState([] as ITag[]);

    const onAddToCart = (id: string, quantity: number) => {
        const newOrder = {...order} as IOrder
        
        if(order[id] != null) {
            newOrder[id].quantity = order[id].quantity + quantity;
        }
        else {
            newOrder[id] = {
                type: stickers.find(sticker => sticker.id === id)!.title,
                quantity
            }
        }
        setCurrentOrder({
            ...newOrder
        })
        if(!isSidebarVisible) {
            setIsSidebarVisible(true)
        }
    }
    console.log(stickers)
    const createStickerCards = () => {
        return stickers.map((sticker) => (
            <StickerCard
                id={sticker.id}
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


    useEffect(() => {
        // const fetchTags = async() => {
        //     const res = await fetch('http://localhost:8080/tags')
        //     const json = await res.json();
        //     setStickers(json)
        // }
        // fetchTags();
        setStickers(tags)
    }, [])

    return (
        <>
        <TagContext.Provider value={stickers}>  
            <Header order={order} onCartClick={() => setIsSidebarVisible(!isSidebarVisible)}/>
        <div className='home-container'>
            <div className='hero'>
                <img src={TrashCan}/>
                <p> Buying Trash Tags Shouldn't Stink!</p>
            </div>
            <div className='tag-container'>
                {createStickerCards()}
            </div>
        </div>
        <Cart
            isSidebarVisible={isSidebarVisible}
            onHide={() => onCloseSidebar()}
            stickers={stickers}
            hasCheckoutBtn={true}
        />
        </TagContext.Provider>
        </> 
    );
}

export default Home;