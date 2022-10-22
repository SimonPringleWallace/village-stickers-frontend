import React from 'react';
import meditate from '../../src/assets/sammy_meditation.png'
import Header from '../header/header';
import './confirmation.css';

const Confirmation = () => {
    return (
        <>
            <Header withCart={false}/>
            <div className='confirmation-container'>
                <h1>Thank you for your order!</h1>
                <img className='meditation' src={meditate}/>
                <h2>We'll take it from here. Your trash tags are on the way.</h2>
                <h3>Questions?<br/>Email us at village-tags@gmail.com</h3>
            </div>
        </>
    )
}

export default Confirmation