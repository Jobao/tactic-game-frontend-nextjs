"use client";
import { addNewUnit, getAllUnits } from "@/lib/data";
import { Unit, UnitClass } from "@/lib/interfaces";
import { Button, Checkbox, Label, Modal, TextInput, Dropdown, Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import UnitAddComponent from "@/components/user/unitAddComponent";

export default function UserProfile() {
	const [units, setUnits] = useState<Unit[]>([]);
	useEffect(() => {
		getAllUnits().then((x) => {
			setUnits(x);
		});
	}, []);
	return (
		<div>
			<div></div>
			<div>
				<UnitAddComponent></UnitAddComponent>
			</div>
		</div>
	);
}
