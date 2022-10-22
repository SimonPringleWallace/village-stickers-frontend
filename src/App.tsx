import React from 'react';
import './App.css';
import { useOrder } from './hooks/useOrder';
import { orderContext } from './state/orderContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Home/Home';
import Confirmation from './confirmation/Confirmation';

function App() {
  const order = useOrder();
  
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
      path: "/confirmation",
      element: <Confirmation/>,
    },
  ]);
  
  return (
    <div className="App">
      <orderContext.Provider value={order}>
        <RouterProvider router={router}/>
      </orderContext.Provider>
    </div>
  );
}

export default App;
