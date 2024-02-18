"use client";
import React, { useEffect, useState } from "react";
import GameList from "../gameList";

type IGameHeaders = {
	game_uuid: string;
	isEnd: boolean;
	isStart: boolean;
};
export default function myCurrentGames() {
	const [myGameHeaders, setMyGameHeaders] = useState<IGameHeaders[]>([]);
	const [joinedGameHeaders, setJoinedGameHeaders] = useState<IGameHeaders[]>([]);
	const [loading, setloading] = useState<boolean>(true);

	useEffect(() => {
		const response = fetch("http://localhost:8081/game/allgamesbyuser", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		});

		response.then((res) => {
			if (res.status === 200) {
				res.json().then((j: IGameHeaders[]) => {
					setMyGameHeaders(
						j.filter((x) => {
							return x.isStart;
						})
					);

					setJoinedGameHeaders(
						j.filter((x) => {
							return !x.isStart;
						})
					);
					setloading(false);
				});
			}
		});
	}, []); //ACA ME QUEDE, ver de cargar una sola vez los datos del servidor, y llamar dos veces
	//a GameList, una con los juegos iniciados, yotro con los juegos creados
	return (
		<>
			{myGameHeaders ? <GameList {...{ games: myGameHeaders, header: "Started Games", gameType: "started" }}></GameList> : "NADA"}
			{joinedGameHeaders ? <GameList {...{ games: joinedGameHeaders, header: "Joined Games", gameType: "joined" }}></GameList> : "NADA"}
		</>
	);
	return myGameHeaders ? <GameList {...{ games: myGameHeaders, header: "Started Games", gameType: "started" }}></GameList> : "NADA";
}
