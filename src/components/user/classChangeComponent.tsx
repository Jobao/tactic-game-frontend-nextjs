import { TupleClassExperience, Unit, UnitClass } from "@/lib/interfaces";
import { Button, Modal, Label, TextInput } from "flowbite-react";

import { useEffect, useState } from "react";

export default function ClassChangeComponent(props: { onUpdate: () => void; unit: Unit }) {
	const [openModal, setOpenModal] = useState(false);
	const [allClases, setAllClases] = useState<UnitClass[]>([]);
	const [classIndex, setClassIndex] = useState(0);

	useEffect(() => {
		fetch("http://localhost:8081/unit-clases/posibles", {
			method: "POST",
			body: JSON.stringify(props.unit.classExperience),
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		}).then((res) => {
			if (res.ok) {
				res.json().then((x: UnitClass[]) => {
					setAllClases(x);
				});
			}
		});
	}, []);

	function handleClick() {
		fetch("http://localhost:8081/user/unit/changeclass", {
			method: "POST",
			body: JSON.stringify({ unit_uuid: props.unit._id, class_id: allClases[classIndex]._id }),
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		}).then((res) => {
			if (res.ok) {
			}
		});
		setOpenModal(!openModal);
		props.onUpdate();
	}

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Cambiar Clase</Button>
			<Modal dismissible show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
				<Modal.Header></Modal.Header>
				<Modal.Body>
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
							{allClases.map((x) => {
								return (
									<option key={x._id} value={x._id}>
										{x._id}
									</option>
								);
							})}
						</select>
					</div>
					<div>
						<Button
							onClick={() => {
								handleClick();
							}}
						>
							Confirmar
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
