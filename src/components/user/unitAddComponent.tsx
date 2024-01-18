"use client";
import { addNewUnit } from "@/lib/data";
import { UnitClass } from "@/lib/interfaces";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";

export default function UnitAddComponent() {
	const [openModal, setOpenModal] = useState(false);
	const [classes, setClasses] = useState<UnitClass[]>([]);
	const [classIndex, setClassIndex] = useState(0);
	const [unitName, setUnitName] = useState("");

	useEffect(() => {
		const response = fetch("http://localhost:8081/unit-clases/initial", {
			method: "GET",
		});

		response.then((res) => {
			if (res.ok) {
				res.json().then((x: UnitClass[]) => {
					setClasses(x);
				});
			}
		});
	}, []);

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Nueva unidad</Button>
			<Modal dismissible show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
				<Modal.Header />
				<Modal.Body>
					<div className=" flex">
						<div className="space-y-1 border-r-2 	">
							<div className="mb-2 block">
								<Label htmlFor="unitName" className=" items-center">
									Nombre
								</Label>
								<TextInput
									autoComplete="off"
									id="unitName"
									onChange={(e) => {
										setUnitName(e.target.value);
									}}
								></TextInput>
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
								<Button
									onClick={() => {
										let res = addNewUnit(unitName, classes[classIndex]._id);
										if (!res) {
											alert("error");
										} else {
											setOpenModal(false);
										}
									}}
								>
									Guardar
								</Button>
							</div>
						</div>
						<div>
							{classes[classIndex]?.baseAttributes.map((x) => {
								return (
									<p key={x.attributeName} className=" mx-2">
										{x.attributeName + " : " + x.amount.toString()}
									</p>
								);
							})}
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
