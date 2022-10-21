import { ITag } from "../Home/interfaces";
import { IOrder } from "../interfaces";

const buildOrderPayload = (order: IOrder, stickers: ITag[]) => {
    const orderPayload = [] as {id: string; type: string; quantity: number, priceKey: string}[];
    console.log('stick', stickers)
    Object.keys(order).forEach(productId => {
        console.log(productId)
        orderPayload.push({
            id: productId,
            type: order[productId].type,
            quantity: order[productId].quantity,
            priceKey: stickers.find(sticker => sticker.id == productId)!.priceKey
        })
    })  
    return orderPayload;      
}

const postData = async(order: IOrder, stickers: ITag[]) => {
    const response = await fetch('http://localhost:8080/stripe', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'applicaiton/json',
    },
    body: JSON.stringify({order: buildOrderPayload(order, stickers)})
    });

    const checkoutUrl = await response.json();
    window.location.href = checkoutUrl.url
}

export default postData