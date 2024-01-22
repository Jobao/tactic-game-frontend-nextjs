import { AttributesName, StatsName } from "../../../tactic-game-backend-nestjs/src/game/schemas/enums";

export interface LoginData {
	user: string;
	pass: string;
}

export interface NewGame {
	sizeX: number; //size del tablero horizontal

	sizeY: number; //size del tablero vertical

	minUnits: number;

	maxUnits: number;
}

export interface GameUnit {
	unitBase_uuid: string;

	posX: number;

	posY: number;

	currentHP: number;

	currentMP: number;

	canPerformActionThisTurn: boolean;

	canMove: boolean;

	canAttack: boolean;

	stats: TupleStats[];
	equipment: any;

	mainClassExperience: TupleClassExperience;

	secondClassExperience: TupleClassExperience;

	//equipment:UnitEquiped
}

export interface PlacedUnit {
	user_uuid: string;

	gameUnit: GameUnit[];
}

export interface GameOrder {}

export interface Game extends NewGame {
	_id: string;

	placedUnitList: PlacedUnit[];

	isEnd: boolean;

	isStart: boolean;

	owner_uuid: string;

	turn: string;

	gamePhase: string;

	gameOrder: GameOrder[];

	game_uuid: string;
}

export interface MoveAction {
	unit_uuid: string;
}

export interface UnitAction {
	type: string;

	target: Target;
}

export interface Target {
	x: number;

	y: number;
}

export interface UnitClass {
	_id: string; //Es su nombre

	baseAttributes: TupleAttribute[];

	requiredClass: TupleRequiredClass[];

	requiredExp: number[];
}

export interface TupleAttribute {
	attributeName: AttributesName;

	amount: number;
}

export interface TupleRequiredClass {
	_id: string;
	experience: number;
}

export interface Unit {
	_id: string;

	name: string;

	defaultMainClassId: string;

	defaultSecondClassId: string;

	defaultEquipment: any; //cambiar despues

	classExperience: TupleClassExperience[];

	defaultStats: TupleStats[];
}

export interface TupleClassExperience {
	_id: string;
	currentExperience: number;
	currentClassLevel: number;

	currentPoints: number;

	habilidadesDesbloquedas: [];
}

export interface TupleStats {
	statsName: StatsName;

	amount: number;
}

export interface User {
	user: string;

	displayName: string;

	createdUnits: Unit[];

	gameJoinedList: string[];
}
