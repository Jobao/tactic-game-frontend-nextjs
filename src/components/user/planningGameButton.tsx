"use client";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

export default function PlanningGameButton() {
	const [openModal, setOpenModal] = useState(false);
	return (
		<>
			<Button {...{ size: "xs" }} onClick={() => setOpenModal(true)}>
				Planificar
			</Button>
			<Modal dismissible show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
				<ModalHeader>Planificacion</ModalHeader>
				<ModalBody></ModalBody>
			</Modal>
		</>
	);
}
