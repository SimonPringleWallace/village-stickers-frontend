import { useCallback, useState } from "react";
import { IOrder } from "../interfaces";
import { IOrderContext } from "../state/orderContext";

export const useOrder = (): IOrderContext => {
    const [order, setOrder ]= useState({} as IOrder)

    const setCurrentOrder = useCallback((currentOrder: IOrder) => {
        setOrder(currentOrder);
    }, []);

    return {
        order,
        setCurrentOrder,
    }
}