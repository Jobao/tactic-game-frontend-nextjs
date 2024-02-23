"use client";
import { useRouter } from "next/navigation";

export default function PlayGameButton(props: { game_uuid: string }) {
	const router = useRouter();

	function handleClick() {
		router.push("/dashboard/game/" + props.game_uuid);
	}
	return (
		<button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleClick()}>
			Jugar
		</button>
	);
}
