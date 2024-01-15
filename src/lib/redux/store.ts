import Player from "@/phaser/classes/player";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { GameUnit } from "@/lib/interfaces";
const posiblesStates = ['NONE',"IDLE", "WAIT_FOR_MOVE", "WAIT_FOR_ATTACK"];
const GameDataInitial: GameUnit= {
	unitBase_uuid: "",
	posX: 0,
	posY: 0,
	currentHP: 0,
	currentMP: 0,
	canPerformActionThisTurn: false,
	canMove: false,
	canAttack: false,
	stats: [{ statsName: "", amount: 0 }],
};

export const prueba = createSlice({
	name: "selectedPlayer",

	initialState: {
		value: {
			selectedUnit: false,
			gameState: "NONE",
			unitData: GameDataInitial,
		},
	},
	reducers: {
		setSelectedUnit: (state, selected: PayloadAction<boolean>) => {
			state.value.selectedUnit = selected.payload;
		},
		setGameState: (state, nState: PayloadAction<string>) => {
			if (
				posiblesStates.find((x) => {
					return x === nState.payload;
				})
			) {
				state.value.gameState = nState.payload;
			} else {
				console.log("error");
			}
		},

		setUnitData: (state, unit: PayloadAction<GameUnit | undefined>) => {
			if(unit.payload){
				state.value.unitData = unit.payload;
			}
			else{
				state.value.unitData = GameDataInitial;
			}
		},

		setUnitPosition:(state, nPos:PayloadAction<{x:number, y:number}>)=>{
			state.value.unitData.posX = nPos.payload.x;
			state.value.unitData.posY = nPos.payload.y;
		}
	},
});

export const { setSelectedUnit, setGameState, setUnitData, setUnitPosition } = prueba.actions;

export type IRootState = ReturnType<typeof prueba.reducer>;

export const STORE = configureStore({
	reducer: prueba.reducer,
});
