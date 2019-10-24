import React from 'react';
import { Loader } from 'semantic-ui-react'

const loadingComponent = () => {
    return (
        <div style={{ marginTop: '30px' }}><Loader active inline='centered' />Loading</div>
    );
}

export default loadingComponent;