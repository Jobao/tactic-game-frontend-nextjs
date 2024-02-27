"use client";
import React, { useEffect, useState } from "react";
import { Unit, IGameHeaders } from "@/lib/interfaces";
import { getAllUnits } from "@/lib/data";
import StartedGameList from "./gameLists/startedGameList";
import JoinedGameList from "./gameLists/joinedGameList";

export default function myCurrentGames(props: { onJoined: boolean }) {
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
	}, [props.onJoined]);
	return (
		<>
			{myGameHeaders ? <StartedGameList {...{ games: myGameHeaders }}></StartedGameList> : "NADA"}
			{joinedGameHeaders ? <JoinedGameList {...{ games: joinedGameHeaders }}></JoinedGameList> : "NADA"}
		</>
	);
}
