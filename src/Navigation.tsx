import React from 'react';
import { Button, Icon } from 'semantic-ui-react';


interface NavProps {
    nextDisabled: boolean;
    backDisabled: boolean;
    onNext: () => void;
    onBack: () => void
}
const Navigation = ({nextDisabled, backDisabled, onBack, onNext}: NavProps) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '50px'}}>
            <Button disabled={backDisabled} size='large' onClick={onBack}>
                <Button.Content visible> Back</Button.Content>
            </Button>
            <Button disabled={nextDisabled} animated size='large' onClick={onNext}>
                <Button.Content visible> Next</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right'/>
                </Button.Content>
            </Button>

        </div>
    )
}

export default Navigation