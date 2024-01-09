import { Game } from "phaser";
import { useState, useRef, useEffect } from "react";
import { Game as GameData } from "@/lib/interfaces";
import MainScene from "@/phaser/scenes/mainscene";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import ScenePrueba from "@/phaser/scenes/scenePrueba";
//import { Demo } from "@/phaser/scenes/panellll";
import Demo from "@/phaser/scenes/pp.js";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

export default function PhaserGame(props: { gameData: GameData }) {
	const [game, setGame] = useState<Game | null>(null);
	const parentEl = useRef<HTMLDivElement>(null);
	useEffect(() => {
		async function initPhaser() {
			const Phaser = await import("phaser");

			if (game) {
				return;
			}
			if (!parentEl.current) {
				return;
			}

			const newGame = new Game({
				type: Phaser.AUTO,
				parent: parentEl.current,
				title: "game",
				width: 800,
				height: 600,
				pixelArt: true,
				scene: [],
				plugins: {
					scene: [
						{
							key: "rexUI",
							plugin: UIPlugin,
							mapping: "rexUI",
						},
						{
							key: "boardPlugin",
							plugin: BoardPlugin,
							mapping: "boardPlugin",
						},
						// ...
					],
				},
			});
			newGame.scene.add("main", MainScene, false);

			setGame(newGame);
		}
		initPhaser();
	}, []);

	useEffect(() => {
		if (game) {
			game.scene.start("main", props.gameData);
		}
	}, [game]);

	return <div ref={parentEl} className="gameContainer w-screen h-1/2 block" />;
}
