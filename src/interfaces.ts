import { ITag } from "./Home/interfaces"

export interface IOrder {
    [id: string]: {
        type: ITag['title'];
        quantity: number;
    }
}