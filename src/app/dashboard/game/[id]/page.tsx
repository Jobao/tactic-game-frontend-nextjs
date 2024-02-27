"use client";

import { getGameDetails } from "@/lib/data";
import { CustomResponseType, Game, GameUnit } from "@/lib/interfaces";
import { STORE } from "@/lib/redux/store";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
const PhaserGameComponentDynamic = dynamic(() => import("@/components/phaser/phaserGame"), {
	ssr: false,
});

export default function GameDetails() {
	const params = useParams<{ id: string }>();
	const [actGame, setActGame] = useState<Game>();
	const [selectedUnit, setSelectedUnit] = useState<GameUnit | undefined>();
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		try {
			getGameDetails(params.id).then((res: CustomResponseType<Game | undefined> | undefined) => {
				console.log(res);

				if (res?.status === "OK") {
					setActGame(res.data);
					if (actGame) {
						actGame.game_uuid = params.id.toString();
					}
				}
			}); /*
			if (sessionStorage.getItem("jwt")) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const response = fetch("http://localhost:8081/game/" + params.id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: sessionStorage.getItem("jwt") || "",
					},
				}).then(async (x) => {
					if (x.status === 200) {
						await x.json().then((y: Game) => {
							setActGame(y);
							if (actGame) {
								actGame.game_uuid = params.id.toString();
							}
						});
					} else {
						if (x.status === 401) {
							sessionStorage.removeItem("jwt");
							sessionStorage.removeItem("user_uuid");
						}
					}
				});
			}*/
		} catch (error) {
			//console.log(error);
		}
	}, [update]);

	function handleOnSelectUnit(gameUnit: GameUnit) {
		setSelectedUnit(gameUnit);
	}

	function handleOnChangeValue() {
		setUpdate(!update);
		if (selectedUnit) {
			handleOnSelectUnit(selectedUnit);
		}
	}

	if (actGame) {
		return (
			<Provider store={STORE}>
				<div className=" flex">
					<PhaserGameComponentDynamic {...{ gameData: actGame }}></PhaserGameComponentDynamic>
				</div>
			</Provider>
		);
	} else {
		return <div>Error en la carga del juego</div>;
	}
}
