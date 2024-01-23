import Player from "@/phaser/classes/player";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { GameUnit } from "@/lib/interfaces";
import { StatsName } from "../../../../tactic-game-backend-nestjs/src/game/schemas/enums";
const posiblesStates = ["NONE", "IDLE", "WAIT_FOR_MOVE", "WAIT_FOR_ATTACK"];
const GameDataInitial: GameUnit = {
	unitBase_uuid: "",
	posX: 0,
	posY: 0,
	currentHP: 0,
	currentMP: 0,
	canPerformActionThisTurn: false,
	canMove: false,
	canAttack: false,
	stats: [{ statsName: StatsName.HP, amount: 0 }],
	equipment: undefined,
	mainClassExperience: {
		_id: "",
		currentExperience: 0,
		currentClassLevel: 0,
		currentPoints: 0,
		habilidadesDesbloquedas: [],
	},
	secondClassExperience: {
		_id: "",
		currentExperience: 0,
		currentClassLevel: 0,
		currentPoints: 0,
		habilidadesDesbloquedas: [],
	},
	owner_uuid: "",
};

export const gameStore = createSlice({
	name: "gameStore",

	initialState: {
		gameDataStore: {
			selectedUnit: false,
			gameState: "NONE",
			unitData: GameDataInitial,
		},
	},
	reducers: {
		setSelectedUnit: (state, selected: PayloadAction<boolean>) => {
			state.gameDataStore.selectedUnit = selected.payload;
		},
		setGameState: (state, nState: PayloadAction<string>) => {
			if (
				posiblesStates.find((x) => {
					return x === nState.payload;
				})
			) {
				state.gameDataStore.gameState = nState.payload;
			} else {
				console.log("error");
			}
		},

		setUnitData: (state, unit: PayloadAction<GameUnit | undefined>) => {
			if (unit.payload) {
				state.gameDataStore.unitData = unit.payload;
			} else {
				state.gameDataStore.unitData = GameDataInitial;
			}
		},

		setUnitPosition: (state, nPos: PayloadAction<{ x: number; y: number }>) => {
			state.gameDataStore.unitData.posX = nPos.payload.x;
			state.gameDataStore.unitData.posY = nPos.payload.y;
		},

		resetData: (state) => {
			(state.gameDataStore.gameState = "NONE"), (state.gameDataStore.unitData = GameDataInitial);
			state.gameDataStore.selectedUnit = false;
		},
	},
});

export const { setSelectedUnit, setGameState, setUnitData, setUnitPosition, resetData } = gameStore.actions;

export type IGameStoreState = ReturnType<typeof gameStore.reducer>;

export const STORE = configureStore({
	reducer: gameStore.reducer,
});
