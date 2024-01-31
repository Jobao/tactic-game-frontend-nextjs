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
	const [inventory, setInventory] = useState<{ inventory: { amount: number; item: { img_url: string } }[] }>();
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

	useEffect(() => {
		const response = fetch("http://localhost:8081/user/inventory", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		});

		response.then((x) => {
			if (x.ok) {
				x.json().then((y) => {
					setInventory(y);
				});
			}
		});
	}, []);

	function handleAdd() {
		setNunit(!nUnit);
	}
	function calcularExpProgress(x: Unit, main: boolean) {
		let aux: number | undefined = 0;
		let tuple = x.classExperience.find((e) => {
			if (main) {
				return e._id === x.defaultMainClassId;
			} else {
				return e._id === x.defaultSecondClassId;
			}
		});
		if (tuple) {
			if (main) {
				aux = allClases.find((y) => {
					return y._id === x.defaultMainClassId;
				})?.requiredExp[tuple?.currentClassLevel];
				if (aux) {
					return tuple.currentExperience / aux;
				}
			} else {
				aux = allClases.find((y) => {
					return y._id === x.defaultSecondClassId;
				})?.requiredExp[tuple?.currentClassLevel];
				if (aux) {
					return tuple.currentExperience / aux;
				}
			}
		}

		return 0;
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
								Main Class
							</th>
							<th scope="col" className="px-6 py-3">
								Second Class
							</th>
							<th scope="col" className="px-6 py-3">
								Stats
							</th>
							<th scope="col" className="px-6 py-3">
								Equipamento
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
													width: calcularExpProgress(x, true),
												}}
											></div>
										</div>
									</td>
									<td>
										{x.defaultSecondClassId === "" ? (
											<div>
												{x.defaultSecondClassId}
												<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
													<div
														className="  bg-blue-600 h-2.5 rounded-full text-xs font-medium text-black text-center align-text-top leading-none"
														style={{
															width: calcularExpProgress(x, false),
														}}
													></div>
												</div>
											</div>
										) : (
											<div></div>
										)}
									</td>
									<td>
										{x.defaultStats.map((y) => {
											return (
												<div key={y.statsName} className=" inline-flex">
													<span className=" text-red-400 ">{y.statsName}</span>
													<span> : </span>
													<span className=" me-1.5">{y.amount}</span>
												</div>
											);
										})}
									</td>
									<td>Equipamento</td>
									<td className=" inline-flex">
										<ClassChangeComponent {...{ onUpdate: handleAdd, unit: x }}></ClassChangeComponent>
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
			<div className=" grid grid-cols-8 grid-rows-6 ">
				{inventory
					? inventory.inventory.map((item, i) => {
							return <img key={i} src={item.item.img_url} alt="" style={{ gap: 2 }} className=" h-8 w-8 border-solid" />;
					  })
					: "NO"}
			</div>
		</div>
	);
}
