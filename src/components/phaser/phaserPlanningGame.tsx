"use client";
import PlanningScene from "@/phaser/scenes/planningScene";
import { Game } from "phaser";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { useEffect, useRef, useState } from "react";

export default function PhaserGamePlanning() {
	const parentEl = useRef<HTMLDivElement>(null);
	const [game, setGame] = useState<Game | null>(null);
	const [isReady, setReady] = useState(false);
	const [sceneM, setSceneM] = useState<PlanningScene>();

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
				min: {
					width: 800,
					height: 600,
				},
			},
			plugins: {
				scene: [
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
		newGame.scene.add("main", PlanningScene, false);

		setGame(newGame);
		return () => {
			setReady(false);
			newGame.destroy(true);
		};
	}, []);

	useEffect(() => {
		if (game) {
			game.scene.start("main");
			setSceneM(game.scene.getAt(0) as PlanningScene);
		}
	}, [game]);
	return (
		<div>
			<div ref={parentEl} className=""></div>
		</div>
	);
}
