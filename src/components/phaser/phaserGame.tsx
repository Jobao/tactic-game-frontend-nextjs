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
import { setSelectedUnit, gameStore, STORE, IGameStoreState, setGameState } from "@/lib/redux/store";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import useGetSession from "../customHooks/useGetSession";

export default function PhaserGame(props: { gameData: GameData }) {
	const [isReady, setReady] = useState(false);
	const [game, setGame] = useState<Game | null>(null);
	const parentEl = useRef<HTMLDivElement>(null);
	const [sceneM, setSceneM] = useState<MainScene>();
	var isSelectedUnitStore = useSelector((state: IGameStoreState) => state.gameDataStore.selectedUnit);
	var gameStateStore = useSelector((state: IGameStoreState) => state.gameDataStore.gameState);
	var unitDataStore = useSelector((state: IGameStoreState) => state.gameDataStore.unitData);

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

	function isMine() {
		var z = sessionStorage.getItem("user_uuid");
		if (z) {
			return z === unitDataStore.owner_uuid;

			//No se porque no se actualiza el valor de unitDataStore
		}
		return false;
	}

	return (
		<div className=" relative inline">
			<div ref={parentEl} className=""></div>
			<div id="UI" className=" absolute top-0 border-2 flex" style={{ width: 800, height: 600, marginLeft: 801 }}>
				<div className=" text-black border-2 w-1/3">
					<div id="container-text">
						<p>Game Status: {gameStateStore}</p>
						<hr />
						{isSelectedUnitStore ? (
							<div>
								<p>
									HP : {unitDataStore.currentHP <= 0 ? "0" : unitDataStore.currentHP} / {unitDataStore.stats[0].amount}
								</p>
								<p>
									MP : {unitDataStore.currentMP <= 0 ? "0" : unitDataStore.currentMP} / {unitDataStore.stats[1].amount}
								</p>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>
				<div>
					<Button
						{...{
							disabled: !(
								isMine() &&
								isSelectedUnitStore &&
								unitDataStore.currentHP > 0 &&
								unitDataStore.canMove &&
								unitDataStore.canPerformActionThisTurn
							),
						}}
						onClick={() => {
							if (isSelectedUnitStore) {
								STORE.dispatch(setGameState("WAIT_FOR_MOVE"));
							}
						}}
					>
						Mover
					</Button>

					<Button
						{...{
							disabled: !(
								isMine() &&
								isSelectedUnitStore &&
								unitDataStore.currentHP > 0 &&
								unitDataStore.canMove &&
								unitDataStore.canPerformActionThisTurn
							),
						}}
						onClick={() => {
							if (isSelectedUnitStore) {
								STORE.dispatch(setGameState("WAIT_FOR_ATTACK"));
							}
						}}
					>
						Atacar
					</Button>
				</div>
			</div>
		</div>
	);
}
