import { Button, Modal, Label, TextInput } from "flowbite-react";

import { useState } from "react";

export default function ClassChangeComponent(props: { onUpdate: () => void }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Cambiar Clase</Button>
			<Modal dismissible show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
				<Modal.Header></Modal.Header>
				<Modal.Body></Modal.Body>
			</Modal>
		</>
	);
}
