import React from 'react';
import { Container, Breadcrumb } from 'semantic-ui-react';
import Navigation from '../Navigation';
import Order from '../Order';

const sections = [
    { key: 'Order', content: 'Order', link: true, active: true  },
    { key: 'Details', content: 'Details', link: true },
    { key: 'Confirmation', content: 'Confirmation'},
  ]

const Home = () => {
    return (
        <>
            <Container textAlign='center' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', width: '500px'}}>
                <Container>
                    <Breadcrumb size='big' icon='right arrow' sections={sections} style={{marginBottom: '50px'}} />
                    <Order/>
                    <Navigation/>
                </Container>
            </Container>
        </>
    );
}

export default Home;