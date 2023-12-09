export interface GameUnit{
    unitBase_uuid:string;

    posX: number;

    posY: number;

    currentHP:number;

    currentMP:number;

    canPerformActionThisTurn:boolean

    canMove:boolean

    canAttack:boolean;

    //stats:TupleStats[];

    //equipment:UnitEquiped
}