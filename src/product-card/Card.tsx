import React from 'react';
import { Card, Button, Dropdown, SemanticCOLORS } from 'semantic-ui-react';


interface StickerCardProps {
    name: string;
    quantity: string;
    description: string;
    color: SemanticCOLORS;
}

const StickerCard = ({name, quantity, description, color}: StickerCardProps) => {
    console.log(color)
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

    return(
        <Card color={color}>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className='date'>{quantity}</span>
          </Card.Meta>
          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra >
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Dropdown placeholder={'Qty'} style={{width: 'auto', minWidth: '70px'}} selection fluid options={makeOptions()}/>
                <Button>
                    Add to Cart
                </Button>
            </div>
        </Card.Content>
      </Card>
    );
}

export default StickerCard;