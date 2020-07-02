import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalDialog extends Component {
	render() {
		const {
			show,
			title,
			content,
			onClickOk,
			onClickCancel,
		} = this.props;

		return (
				<Modal
					isOpen={show}
					className={this.props.className}
				>
					<ModalHeader>{title}</ModalHeader>
					<ModalBody>
						{content}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={onClickOk}>
							Delete
						</Button>{" "}
						<Button color="secondary" onClick={onClickCancel}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
		);
	}
}

export default ModalDialog;
