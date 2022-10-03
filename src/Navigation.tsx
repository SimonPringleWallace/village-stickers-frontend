import React from 'react';
import { Button, Icon } from 'semantic-ui-react';


const Navigation = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '50px'}}>
            <Button size='large'>
                <Button.Content visible> Back</Button.Content>
            </Button>
            <Button animated size='large'>
                <Button.Content visible> Next</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right'/>
                </Button.Content>
            </Button>

        </div>
    )
}

export default Navigation