"use client";
import { useRouter } from "next/navigation";

export default function PlanningGameButton(props: { game_uuid: string }) {
	const router = useRouter();

	function handleClick() {
		router.push("/dashboard/game/" + props.game_uuid + "/planning");
	}
	return (
		<button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleClick()}>
			Planear
		</button>
	);
}
