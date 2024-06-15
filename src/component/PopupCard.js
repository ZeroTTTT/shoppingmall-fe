import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const PopupCard = ({ showPopup, setShowPopup }) => {
	return (
		<Modal show={showPopup} onHide={setShowPopup} centered>
			<Modal.Body className='text-center' onClick={setShowPopup}>
				<img src={'/image/popup.png'} width={'100%'} />
			</Modal.Body>
		</Modal>
	);
};

export default PopupCard;
