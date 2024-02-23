"use client";
import React from "react";
import PlayGameButton from "./playGameButton";
import { Button } from "flowbite-react";
import { useJoinGame } from "./customHooks/useJoinGame";
import PlanningGameButton from "./user/planningGameButton";
import { IGameHeaders } from "@/lib/interfaces";

export default function GameList(props: { games: IGameHeaders[]; header: string; gameType: string }) {
	function getButtons(gameHead: IGameHeaders) {
		switch (props.gameType) {
			case "started":
				return (
					<td className="flex items-center px-6 py-4">
						<PlayGameButton {...{ game_uuid: gameHead.game_uuid }}></PlayGameButton>
						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
							Remove
						</a>
					</td>
				);

			case "public":
				return <td className="flex items-center px-6 py-4"></td>;

			case "joined":
				return (
					<td className="flex items-center px-6 py-4">
						<PlanningGameButton></PlanningGameButton>
					</td>
				);
		}
	}
	return (
		<div>
			<h2>{props.header}</h2>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Game ID
							</th>
							<th scope="col" className="px-6 py-3">
								Iniciado
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
						{props.games?.map((game) => {
							return (
								<tr key={game.game_uuid} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{game.game_uuid}
									</th>
									<td className="px-6 py-4">{game.isStart ? "SI" : "NO"}</td>
									<td className="px-6 py-4">{game.isEnd ? "SI" : "NO"}</td>
									{getButtons(game)}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
