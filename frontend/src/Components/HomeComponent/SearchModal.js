import React from 'react';
import { Button, Modal, ModalBody, ModalFooter,ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

export default class SearchModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: !this.props.show
    };
  }

  handleHide() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
        >
           <ToastContainer />
          <ModalHeader>
            <p>Result</p>
          </ModalHeader>
          <ModalBody>
            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
            ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleHide}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}