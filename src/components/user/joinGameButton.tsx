import { Button } from "flowbite-react";
import { joinGame } from "@/lib/data";

export function JoinGameButton(props: { game_uuid: string; handleJoin: () => void }) {
	function handleClick() {
		joinGame(props.game_uuid).then((res) => {
			if (res) {
				if (res.status === "OK") {
					props.handleJoin();
				} else {
					console.log(res.reason);
				}
			} else {
				console.log("error no esperado");
			}
		});
	}
	return (
		<Button
			onClick={() => {
				handleClick();
			}}
		>
			Join
		</Button>
	);
}
