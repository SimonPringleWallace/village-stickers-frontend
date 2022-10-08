import React, {useState} from 'react';
import { Card, Button, Dropdown, SemanticCOLORS, DropdownProps } from 'semantic-ui-react';


interface StickerCardProps {
    name: string;
    unit: string;
    description: string;
    color: SemanticCOLORS;
    onAddToCart(type: string, quantity: string): void
}

const StickerCard = ({name, unit, description, color, onAddToCart}: StickerCardProps) => {
    const [quantity, setQuantity] = useState('1');
    const makeOptions = () => {
        const options = []
        for (let i = 1; i <= 10; i++) {
            options.push({
                key: i,
                text: i.toString(),
                value: i.toString(),
            })
        }
        return options;
    }

    const onQtyChange = (e: React.SyntheticEvent, { value }: DropdownProps) => {
        setQuantity(value as string)
    }

    return(
        <Card color={color}>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className='date'>{unit}</span>
          </Card.Meta>
          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra >
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Dropdown placeholder={'Qty'} value={quantity} onChange={onQtyChange} style={{width: 'auto', minWidth: '70px'}} selection fluid options={makeOptions()}/>
                <Button onClick={() => onAddToCart(name, quantity)}>
                    Add to Cart
                </Button>
            </div>
        </Card.Content>
      </Card>
    );
}

export default StickerCard;