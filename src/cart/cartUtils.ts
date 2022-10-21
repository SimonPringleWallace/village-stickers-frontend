import { IOrder } from "../interfaces";

const buildOrderPayload = (order: IOrder) => {
    const orderPayload = [] as {id: string; type: string; quantity: number}[];
    Object.keys(order).forEach(productId => {
        orderPayload.push({
            id: productId,
            type: order[productId].type,
            quantity: order[productId].quantity
        })
    })  
    return orderPayload;      
}

const postData = async(order: IOrder) => {
    const response = await fetch('http://localhost:8080/stripe', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'applicaiton/json',
    },
    body: JSON.stringify({order: buildOrderPayload(order)})
    });

    const checkoutUrl = await response.json();
    window.location.href = checkoutUrl.url
}

export default postData