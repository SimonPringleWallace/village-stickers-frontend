import { SemanticCOLORS } from "semantic-ui-react";

export interface ITag {
    id: string;
    title: string;
    description: string;
    price: number;
    unit: string;
    color: SemanticCOLORS;
    priceKey: string;
}