import { IGameHeaders } from "@/lib/interfaces";
import PlanningGameButton from "../planningGameButton";

export default function JoinedGameList(props: { games: IGameHeaders[] }) {
	return (
		<>
			<h2>Joined Games</h2>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Game ID
							</th>
							<th scope="col" className="px-6 py-3">
								NADA
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
									<td className="flex items-center px-6 py-4">
										<PlanningGameButton></PlanningGameButton>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
