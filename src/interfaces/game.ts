import { GameOrder } from "./gameOrder";
import { PlacedUnit } from "./placedUnit";

export interface Game{
    _id: string;

    sizeX: number;//size del tablero horizontal

    sizeY:number;//size del tablero vertical

    placedUnitList: PlacedUnit[];

    isEnd:boolean;

    isStart:boolean;

    minUnits:number;


    maxUnits:number;

    owner_uuid:string;

    turn:string;

    gamePhase: string;

    gameOrder:GameOrder[];
}