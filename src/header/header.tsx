import { findByLabelText } from '@testing-library/react';
import React from 'react';
import { Icon } from 'semantic-ui-react';

const style = {
    height: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
}

const Header = () => {
    return (
        <div style={style}>
            <div>Red Hook Village Trash Stickers</div>
            <Icon name="shopping cart"></Icon>
        </div>
    );
}

export default Header;
