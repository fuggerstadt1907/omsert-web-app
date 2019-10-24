import React from 'react';
import { Icon } from 'semantic-ui-react'

export const errorComponent = () => {
    return (
        <div style={{ marginTop: '30px' }}><Icon name='warning sign' />Error while fetching data...</div>
    );
}

export default errorComponent;

