"use client";
import { getAllUnits, getGameDetails } from "@/lib/data";
import { CustomResponseType, Game, Unit } from "@/lib/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function PlanningPage() {
	/**
	 * Esta pagina sirve para planificar el inicio del juego
	 * Que tengo que buscar en el back:
	 * 1: toda la info del juego
	 * 2: todas las unidades
	 */
	const [game, setGame] = useState<Game>();
	const [userUnitList, setUserUnitList] = useState<Unit[]>();
	const [freeUserUnitList, setFreeUserUnitList] = useState<Unit[]>();
	const params = useParams<{ id: string }>();

	useEffect(() => {
		/*
		Promise.all([
			getGameDetails(params.id).then((x: CustomResponseType<Game> | undefined) => {
				if (x) {
					if (x.status === "OK") {
						setGame(x.data);
						console.log("listo 1");
					} else {
						console.log(x.reason);
					}
				} else {
					console.log("no existe respuesta del servidor");
				}
			}),

			getAllUnits().then((x: CustomResponseType<Unit[]> | undefined) => {
				if (x?.status === "OK") {
					setUserUnitList(x.data);
					console.log("listo 2");
				}
			}),
		]).then((values) => {
			console.log("listo las dos");
			console.log(values[0]);

			//console.log(userUnitList);

			let rrrr = x.data.filter((unit) => {
                return !game?.unitList.some((y) => {
                    return unit._id === y.unitBase_uuid;
                });
            });
		});*/
	}, []);

	useEffect(() => {
		Promise.all([getGameDetails(params.id), getAllUnits()]).then((values) => {
			if (values[0]) {
				if (values[0].status === "OK") {
					setGame(values[0].data);
				} else {
					console.log(values[0].reason);
				}
			} else {
				console.log("no existe respuesta del servidor");
			}
			if (values[1]) {
				if (values[1].status === "OK") {
					setUserUnitList(values[1].data);
				}
			}

			//console.log(userUnitList);

			/*let rrrr = values[0].data.filter((unit) => {
                return !game?.unitList.some((y) => {
                    return unit._id === y.unitBase_uuid;
                });
            });*/
		});
	}, []);

	return (
		<div>
			<div></div>
		</div>
	);
}
