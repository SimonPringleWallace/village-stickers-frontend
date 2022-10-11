import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useOrder } from './hooks/useOrder';
import { orderContext } from './state/orderContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Checkout from './Checkout';
import HomePage from './Home/Home';

function App() {
  const order = useOrder();
  console.log('order app', order.order)

  const client = new ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new InMemoryCache(),
  });
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/admin",
      element: <div>admin page</div>,
    },
    {
      path: "/checkout",
      element: <Checkout/>,
    }
  ]);
  
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <orderContext.Provider value={order}>
          <RouterProvider router={router}/>
        </orderContext.Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
