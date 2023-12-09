import { GameUnit } from "./gameUnit";

export interface PlacedUnit{
    
    user_uuid: string;

    gameUnit: GameUnit[];

}