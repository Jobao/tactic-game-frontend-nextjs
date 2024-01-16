"use client";
import { UnitClass } from "@/lib/interfaces";
import { Button, Checkbox, Label, Modal, TextInput, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";

export default function UserProfile() {
	const [openModal, setOpenModal] = useState(false);
	const [email, setEmail] = useState("");
	const [classes, setClasses] = useState<UnitClass[]>([]);
	const [classIndex, setClassIndex] = useState(0);

	useEffect(() => {
		const response = fetch("http://localhost:8081/unit-clases/initial", {
			method: "GET",
		});

		response.then((res) => {
			if (res.ok) {
				res.json().then((x: UnitClass[]) => {
					setClasses(x);
					console.log(x);
				});
			}
		});
	}, []);
	return (
		<div>
			<Button onClick={() => setOpenModal(true)}>Nueva unidad</Button>
			<Modal dismissible show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
				<Modal.Header />
				<Modal.Body>
					<div className=" flex">
						<div className="space-y-1 border-r-2 ">
							<div className="mb-2 block">
								<Label htmlFor="unitName" className=" items-center">
									Nombre
								</Label>
								<TextInput id="unitName"></TextInput>
							</div>
							<div className="mb-2 block">
								<Label htmlFor="unitClass" className=" items-center">
									Clase
								</Label>
								<select
									id="unitClass"
									onChange={(e) => {
										setClassIndex(e.target.selectedIndex);
									}}
								>
									{classes.map((x) => {
										return (
											<option key={x._id} value={x._id}>
												{x._id}
											</option>
										);
									})}
								</select>
							</div>
							<div className=" mb-2  absolute bottom-0 right-0">
								<Button onClick={() => {}}>Guardar</Button>
							</div>
						</div>
						<div>
							<Label htmlFor="HP">HP: {classes[classIndex].baseAttributes[0].amount}</Label>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
