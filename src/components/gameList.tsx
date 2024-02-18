"use client";
import { useRouter } from "next/navigation";
import React from "react";
import PlayGameButton from "./playGameButton";

type GameHeaderType = {
	game_uuid: string;
	isEnd: boolean;
	isStart: boolean;
};

export default function GameList(props: { games: GameHeaderType[]; header: string; gameType: string }) {
	const router = useRouter();

	function getButtons(gameHead: GameHeaderType) {
		switch (props.gameType) {
			case "started":
				return (
					<td className="flex items-center px-6 py-4">
						<PlayGameButton {...{ game_uuid: gameHead.game_uuid, router: router }}></PlayGameButton>
						<a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
							Remove
						</a>
					</td>
				);

			case "public":
				return (
					<td className="flex items-center px-6 py-4">
						<JoinGameButton></JoinGameButton>
					</td>
				);

			case "joined":
				return <div>Editar</div>;
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

export function JoinGameButton() {
	return <div>JOIN</div>;
}
