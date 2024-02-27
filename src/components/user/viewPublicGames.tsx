"use client";
import React, { useEffect, useState } from "react";
import PlayGameButton from "../playGameButton";
import PublicGameList from "./gameLists/publicGameList";
type IGameHeaders = {
	game_uuid: string;
	isEnd: boolean;
	isStart: boolean;
};
export default function ViewPublicGames(props: { handleJoin: () => void; update: boolean }) {
	const [myGameHeaders, setMyGameHeaders] = useState<IGameHeaders[]>([]);
	const [loading, setloading] = useState<boolean>(true);
	useEffect(() => {
		const response = fetch("http://localhost:8081/game/publicgames", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		});

		response.then((res) => {
			if (res.status === 200) {
				res.json().then((j: IGameHeaders[]) => {
					setMyGameHeaders(j);
					setloading(false);
				});
			}
		});
	}, [props.update]);

	return <div>{myGameHeaders ? <PublicGameList {...{ games: myGameHeaders, handleJoin: props.handleJoin }}></PublicGameList> : "NADA"}</div>;
}
