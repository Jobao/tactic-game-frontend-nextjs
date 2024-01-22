"use client";
import { addNewUnit, getAllUnits, getUserData } from "@/lib/data";
import { TupleStats, Unit, UnitClass, User } from "@/lib/interfaces";
import { Button, Checkbox, Label, Modal, TextInput, Dropdown, Toast, Progress } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import UnitAddComponent from "@/components/user/unitAddComponent";
import ClassChangeComponent from "@/components/user/classChangeComponent";

export default function UserProfile() {
	const [profile, setProfile] = useState<User>();
	const [units, setUnits] = useState<Unit[]>([]);
	const [nUnit, setNunit] = useState(false);

	const [allClases, setAllClases] = useState<UnitClass[]>([]);
	useEffect(() => {
		getAllUnits().then((x) => {
			setUnits(x);
		});
	}, [nUnit]);

	useEffect(() => {
		const response = fetch("http://localhost:8081/unit-clases", {
			method: "GET",
		});

		response.then((res) => {
			if (res.ok) {
				res.json().then((x: UnitClass[]) => {
					setAllClases(x);
				});
			}
		});
	}, []);

	function handleAdd() {
		setNunit(!nUnit);
	}

	function createStatsDisplay(t: TupleStats[]) {
		let p: React.JSX.Element;

		let result = "";
		t.forEach((element) => {
			result += "<span>" + element.statsName + " : " + element.amount.toString() + " </span>";
		});

		return result;
	}
	function calcularExpProgress(x: Unit) {
		let aux: number | undefined = 0;
		let tuple = x.classExperience.find((e) => {
			return e._id === x.defaultMainClassId;
		});
		if (tuple) {
			aux = allClases.find((y) => {
				return y._id === x.defaultMainClassId;
			})?.requiredExp[tuple?.currentClassLevel];
			if (aux) {
				return tuple.currentExperience / aux;
			}
		}

		return;
	}
	return (
		<div>
			<div>
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Nombre
							</th>
							<th scope="col" className="px-6 py-3">
								Clase
							</th>
							<th scope="col" className="px-6 py-3">
								Stats
							</th>
							<th scope="col" className="px-6 py-3">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{units.map((x) => {
							return (
								<tr key={x._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td>{x.name}</td>
									<td>
										{x.defaultMainClassId}
										<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
											<div
												className="  bg-blue-600 h-2.5 rounded-full text-xs font-medium text-black text-center align-text-top leading-none"
												style={{
													width: calcularExpProgress(x),
												}}
											></div>
										</div>
									</td>
									<td>
										{x.defaultStats.map((y) => {
											return (
												<div id={x._id} className=" inline-flex">
													<span className=" text-red-400 ">{y.statsName}</span>
													<span> : </span>
													<span className=" me-1.5">{y.amount}</span>
												</div>
											);
										})}
									</td>
									<td className=" inline-flex">
										<ClassChangeComponent {...{ onUpdate: handleAdd }}></ClassChangeComponent>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div>
				<UnitAddComponent
					{...{
						onUpdate: handleAdd,
						initialClasses: allClases.filter((x) => {
							return x.requiredClass.length === 0;
						}),
					}}
				></UnitAddComponent>
			</div>
		</div>
	);
}
