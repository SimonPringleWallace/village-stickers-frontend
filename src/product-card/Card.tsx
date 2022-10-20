import React, {useState} from 'react';
import { Card, Button, Dropdown, SemanticCOLORS, DropdownProps, Icon } from 'semantic-ui-react';


interface StickerCardProps {
    id: string;
    name: string;
    unit: string;
    description: string;
    price: number
    color: SemanticCOLORS;
    onAddToCart(id: string, quantity: number): void
}

const StickerCard = ({id, name, unit, description, color, price, onAddToCart}: StickerCardProps) => {
    const [quantity, setQuantity] = useState(1);
    const makeOptions = () => {
        const options = []
        for (let i = 1; i <= 10; i++) {
            options.push({
                key: i,
                text: i.toString(),
                value: i,
            })
        }
        return options;
    }

    const onQtyChange = (e: React.SyntheticEvent, { value }: DropdownProps) => {
        setQuantity(value as number)
    }

    const addToCart = () => {
        onAddToCart(id, quantity);
        setQuantity(1);
    }

    return(
        <Card style={{margin: '0 10px'}} color={color}>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className='date'>{unit}</span>
          </Card.Meta>
          <Card.Description>
            {description}
          </Card.Description>
          <Card.Description>
            {`$${price.toFixed(2).toString()}`}
          </Card.Description>
        </Card.Content>
        <Card.Content extra >
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Dropdown placeholder={'Qty'} value={quantity} onChange={onQtyChange} style={{width: 'auto', minWidth: '70px'}} selection fluid options={makeOptions()}/>
                <Button animated="vertical" onClick={addToCart}>
                    <Button.Content visible>Add to Cart</Button.Content>
                    <Button.Content hidden>
                        <Icon name='cart'/>
                    </Button.Content>
                </Button>
            </div>
        </Card.Content>
      </Card>
    );
}

export default StickerCard;