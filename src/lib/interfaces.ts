import { AttributesName, EquipmentSlot, StatsName, TypeAffect, TypeEffect, WeaponType } from "../../../tactic-game-backend-nestjs/src/game/schemas/enums";

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
	user_uuid: string;

	unitBase_uuid: string;

	posX: number;

	posY: number;

	currentHP: number;

	currentMP: number;

	canPerformActionThisTurn: boolean;

	canMove: boolean;

	canAttack: boolean;

	stats: TupleStats[];

	equipment: EquipmentOBJDto;

	mainClassExperience: TupleClassExperience;

	secondClassExperience: TupleClassExperience;
}
export interface EquipmentOBJDto {
	head?: EquipableItem;
	chest?: EquipableItem;
	gloves?: EquipableItem;
	feet?: EquipableItem;
	mainHand?: WeaponItem;
	secondHand?: WeaponItem;
	amulet?: EquipableItem;
}

export interface Item {
	_id: string;

	description: string;

	name: string;

	/*@Prop({enum:[]})
    itemType:string*/
}

export interface EquipableItem extends Item {
	slot: EquipmentSlot;

	effects: [Effect];

	stats: [TupleStats];
}

export interface WeaponItem extends EquipableItem {
	range: number;

	weaponType: WeaponType;
}

export interface Effect {
	stats: TupleStats;
	typeEffect: TypeEffect;
	turn: number;
	unitAffect: TypeAffect;
}

export interface PlacedUnit {
	user_uuid: string;

	gameUnit: GameUnit[];
}

export interface GameOrder {}

export interface Game extends NewGame {
	_id: string;

	unitList: GameUnit[];

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

export interface Item {}
