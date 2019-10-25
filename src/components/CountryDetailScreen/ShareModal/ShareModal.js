import React from 'react';
import { Button, Icon, Input, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const shareModal = (props) => {
    return (
        <Modal open={props.open} onClose={props.close}>
            <Modal.Header style={{ fontFamily: 'Asap' }}>Share Country</Modal.Header>

            <Modal.Content style={{ fontFamily: 'Asap' }}>
                <p>Use this URL to share the country details with your friends.</p>
                <Input style={{ width: '100%' }} value={props.url} />
            </Modal.Content>

            <Modal.Actions >
                <Button
                    style={{ fontFamily: 'Asap', backgroundColor: '#651FFF', color: 'white' }}
                    onClick={props.close}
                >
                    <Icon name='close' />Close
                </Button>
            </Modal.Actions>

        </Modal>
    );
}

shareModal.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    url: PropTypes.string
};

export default shareModal;