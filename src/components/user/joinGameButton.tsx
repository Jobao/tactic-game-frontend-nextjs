import { Button } from "flowbite-react";
import { useJoinGame } from "../customHooks/useJoinGame";

export function JoinGameButton(props: { game_uuid: string; handleJoin: () => void }) {
	return (
		<Button
			onClick={() => {
				useJoinGame(props.game_uuid);
				props.handleJoin();
			}}
		>
			Join
		</Button>
	);
}
