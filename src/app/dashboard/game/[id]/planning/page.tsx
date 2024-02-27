"use client";
import { getAllUnits, getGameDetails } from "@/lib/data";
import { CustomResponseType, Game, Unit } from "@/lib/interfaces";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const PhaserGameComponentDynamic = dynamic(() => import("@/components/phaser/phaserPlanningGame"), {
	ssr: false,
});
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
		});
	}, []);
	function existOnGame(unit_uuid: string) {
		return game?.unitList.some((u) => {
			return u.unitBase_uuid === unit_uuid;
		});
	}
	return (
		<div>
			<div>
				<div>
					<PhaserGameComponentDynamic></PhaserGameComponentDynamic>
				</div>
				{userUnitList?.map((unit) => {
					return (
						<div key={unit._id}>
							{unit.name + " "}
							{existOnGame(unit._id) ? "Existe" : "NO"}
						</div>
					);
				})}
			</div>
		</div>
	);
}
