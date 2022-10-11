import React, { createContext } from "react";
import { IOrder } from "../interfaces";

export interface IOrderContext {
    order: IOrder;
    setCurrentOrder: (order: IOrder) => void;
}

export const ORDER_DEFAULT_VALUE = {
    order: {},
    setCurrentOrder: () => null
}

export const orderContext = createContext<IOrderContext>(ORDER_DEFAULT_VALUE);