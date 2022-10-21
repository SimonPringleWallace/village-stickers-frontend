import { ITag } from "./Home/interfaces"

export interface IOrder {
    [type: ITag['title']]: number
}