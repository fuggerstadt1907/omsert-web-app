import React from 'react';
import { Input, } from 'semantic-ui-react'

const search = (props) => {
    return (

        <Input
            icon='search'
            placeholder='Search...'
            loading={props.loading}
            style={{ fontFamily: 'Asap', margin: '10px', width: '70%', borderRadius: '20px', padding: '5px', fontSize: '16px' }}
            onChange={props.searchHandler}
        />

    )
}

export default search;