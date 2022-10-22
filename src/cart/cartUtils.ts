import { ITag } from "../Home/interfaces";
import { IOrder } from "../interfaces";

const buildOrderPayload = (order: IOrder, stickers: ITag[]) => {
    const orderPayload = [] as {id: string; type: string; quantity: number, priceKey: string}[];
    Object.keys(order).forEach(productId => {
        orderPayload.push({
            id: productId,
            type: order[productId].type,
            quantity: order[productId].quantity,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            priceKey: stickers.find(sticker => sticker.id == productId)!.priceKey
        })
    })  
    return orderPayload;      
}

const postData = async(order: IOrder, stickers: ITag[]) => {
    const response = await fetch(`${process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_WEB_BACKEND_LOCAL
    : process.env.REACT_APP_WEB_BACKEND_API}/stripe`, {
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