import { Game } from "@/lib/interfaces";
import React, { createContext, useContext } from "react";

export const gameContext = createContext<Game>({
	...{},
	_id: "",
	unitList: [],
	isEnd: false,
	isStart: false,
	owner_uuid: "",
	turn: "",
	gamePhase: "",
	gameOrder: [],
	sizeX: 0,
	sizeY: 0,
	minUnits: 0,
	maxUnits: 0,
	game_uuid: "",
});

export function useGameContext() {
	return useContext(gameContext);
}
