import React, { useCallback, useState } from "react";
import { IOrder } from "../interfaces";
import { IOrderContext } from "../state/orderContext";

export const useOrder = (): IOrderContext => {
    const [order, setOrder ]= useState({} as IOrder)

    const setCurrentOrder = (currentOrder: IOrder) => {
        console.log('called')
        setOrder(currentOrder);
        console.log('current order is', currentOrder)
    };

    return {
        order,
        setCurrentOrder,
    }
}