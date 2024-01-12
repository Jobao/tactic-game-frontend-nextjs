import { Game } from "phaser";
import { useState, useRef, useEffect } from "react";
import { Game as GameData } from "@/lib/interfaces";
import MainScene from "@/phaser/scenes/mainscene";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import ScenePrueba from "@/phaser/scenes/scenePrueba";
//import { Demo } from "@/phaser/scenes/panellll";
import Demo from "@/phaser/scenes/pp.js";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { Button } from "flowbite-react";

export default function PhaserGame(props: { gameData: GameData }) {
	const [isReady, setReady] = useState(false);
	const [game, setGame] = useState<Game | null>(null);
	const parentEl = useRef<HTMLDivElement>(null);
	const [sceneM, setSceneM] = useState<MainScene>();

	/*useEffect(() => {
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
				scale: {
					mode: Phaser.Scale.FIT,
					width: 800,
					height: 600,
				},
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
		return () => {
			setReady(false)
			game.destroy(true)
		  }
	}, []);
*/
	useEffect(() => {
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
			scale: {
				mode: Phaser.Scale.FIT,
				width: 800,
				height: 600,
			},
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
			transparent: true,
		});
		newGame.scene.add("main", MainScene, false);

		setGame(newGame);
		return () => {
			setReady(false);
			newGame.destroy(true);
		};
	}, []);

	useEffect(() => {
		if (game) {
			game.scene.start("main", props.gameData);
			setSceneM(game.scene.getAt(0) as MainScene);
		}
	}, [game]);

	return (
		<div ref={parentEl} className=" static" style={{ width: 800, height: 600 }}>
			<div className=" absolute bottom-2/4 left-2/4 text-white">
				<p>Hola Mundo</p>
			</div>
			<div>
				<Button
					{...{ disabled: !sceneM?.selectedUnit }}
					onClick={() => {
						console.log(sceneM?.selectedUnit?.unit_data.unitBase_uuid);
					}}
				>
					prueba
				</Button>
			</div>
		</div>
	);
}
