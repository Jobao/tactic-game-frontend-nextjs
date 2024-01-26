"use client";
import { useEffect, useState } from "react";
import PlayGameButton from "./playGameButton";
import React from "react";
import { useRouter } from "next/navigation";

export default function ListGames() {
	const [loading, setloading] = useState<boolean>();
	const [gameHeaders, setGameHeaders] = useState<[{ game_uuid: string; isEnd: boolean; isStart: boolean }]>();
	const router = useRouter();

	useEffect(() => {
		setloading(true);
		const response = fetch("http://localhost:8081/game/allgamesbyuser", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: sessionStorage.getItem("jwt") || "",
			},
		});

		response.then((res) => {
			if (res.status === 200) {
				res.json().then((j: [{ game_uuid: string; isEnd: boolean; isStart: boolean }]) => {
					setGameHeaders(j);
					setloading(false);
				});
			}
		});
	}, []);

	if (!loading) {
		return (
			<div>
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Game ID
								</th>
								<th scope="col" className="px-6 py-3">
									Finalizado
								</th>
								<th scope="col" className="px-6 py-3">
									Acciones
								</th>
							</tr>
						</thead>
						<tbody>
							{gameHeaders?.map((game) => {
								return (
									<tr
										key={game.game_uuid}
										className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
									>
										<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{game.game_uuid}
										</th>
										<td className="px-6 py-4">{game.isEnd ? "SI" : "NO"}</td>
										<td className="flex items-center px-6 py-4">
											<PlayGameButton {...{ game_uuid: game.game_uuid, router: router }}></PlayGameButton>
											<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
												Remove
											</a>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	} else {
		return <div>LOADING</div>;
	}
}
