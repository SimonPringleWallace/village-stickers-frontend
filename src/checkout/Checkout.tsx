import React, { useContext, useEffect, useState } from 'react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Cart from '../cart/Cart';
import { TagContext } from '../Home/Home';
import { ITag } from '../Home/interfaces';
import { orderContext } from '../state/orderContext';
import './checkout.css';

const style = {
    display: 'flex',
    flexDirection: 'row',
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}

const Checkout = () => {
    const { order } = useContext(orderContext)
    const [userDetails, setUserDetails] = useState({} as { [formValue: string]: string });
    const [isLoading, setIsLoading] = useState(false);
    const [stickers, setStickers] = useState([] as ITag[])

    const handleChange = (key: string, e: React.SyntheticEvent<HTMLElement, Event>, { value }: any) => {
        setUserDetails({
            ...userDetails,
            [key]: value
        })
    }

    const buildOrderPayload = () => {
        const orderPayload = [] as { id: string; type: string; quantity: number, priceKey: string }[];
        Object.keys(order).forEach(productId => {
            orderPayload.push({
                id: productId,
                type: order[productId].type,
                quantity: order[productId].quantity,
                priceKey: ''
                
            })
        })
        return orderPayload;
    }

    const postData = async () => {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaiton/json',
            },
            body: JSON.stringify({ user: { ...userDetails, spam: '' }, order: buildOrderPayload() })
        });

        const checkoutUrl = await response.json();
        window.location.href = checkoutUrl.url
    }

    useEffect(() => {
        const fetchTags = async () => {
            const res = await fetch('http://localhost:8080/tags')
            const json = await res.json();
            setStickers(json)
        }
        fetchTags();
    }, [])

    return (
        <TagContext.Provider value={stickers}>
            <div className='checkoutContainer' style={containerStyle as React.CSSProperties}>
                <div className='shippingForm'>
                    <Form onSubmit={() => postData()}>
                        <Header className='shipping-title'>Contact Info</Header>
                        <Form.Input className='emailInput' onChange={(e, data) => handleChange('email', e, data)} required label='Email' placeholder='Email' />
                        <Header className='shipping-title'>Shipping Address</Header>
                        <Form.Group widths='equal' className='names' style={style}>
                            <Form.Input onChange={(e, data) => handleChange('firstName', e, data)} required label='First name' placeholder='First name' />
                            <Form.Input onChange={(e, data) => handleChange('lastName', e, data)} required label='Last name' placeholder='Last name' />
                        </Form.Group>
                        <Form.Group style={{ display: 'flex', flexDirection: 'column', width: '600px' }}>
                            <Form.Input onChange={(e, data) => handleChange('address', e, data)} required label='Address' placeholder='Address' />
                        </Form.Group>
                        <Form.Group widths='equal' style={{ width: '600px' }}>
                            <Form.Input onChange={(e, data) => handleChange('city', e, data)} required label='City' placeholder='City' />
                            <Form.Input onChange={(e, data) => handleChange('state', e, data)} required label='State' placeholder='State' />
                            <Form.Input onChange={(e, data) => handleChange('zipCode', e, data)} required label='Zip Code' placeholder='Zip Code' />
                        </Form.Group>
                        <p>*You will be transfered to Stripe for secure payment processing. We'll see you back here after!</p>
                        <Form.Button color='blue' className="checkout-next-btn" size='large' loading={isLoading} enabled="true">Continue</Form.Button>
                    </Form>
                </div>

                <Cart
                    isSidebarVisible={true}
                    hasCheckoutBtn={false}
                    stickers={stickers}
                    isCloseable={false}
                />
            </div>
        </TagContext.Provider>
    );
}

export default Checkout