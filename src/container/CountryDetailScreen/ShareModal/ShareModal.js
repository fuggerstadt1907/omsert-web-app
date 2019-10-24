import React from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

const shareModal = (props) => {
    return (
        <Modal open={props.open} onClose={props.close}>
            <Modal.Header style={{ fontFamily: 'Asap' }}>Share Country</Modal.Header>

            <Modal.Content style={{ fontFamily: 'Asap' }}>
                <p>Use this URL to share the country details with your friends.</p>
                <Input label='URL' style={{ width: '100%' }} value={props.url} />
            </Modal.Content>

            <Modal.Actions >
                <Button
                    style={{ fontFamily: 'Asap', backgroundColor: '#651FFF', color: 'white' }}
                    onClick={props.close}
                >
                    Close
                </Button>
            </Modal.Actions>

        </Modal>
    );
}

export default shareModal;