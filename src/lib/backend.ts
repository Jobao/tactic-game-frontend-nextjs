import { NextResponse } from "next/server";



export async function createGame(ng:nGame, jwt:string){
    const response = await fetch("http://localhost:8081/game",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": jwt
        },
        body:JSON.stringify(ng)
    })
    
}

export async function getAllGame(){
    const response = await fetch("http://localhost:8081/admin/games",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return await response.json();
    
}

class nGame{

    constructor(_min:number, _max:number, x:number, y:number){
        this.minUnits = _min;
        this.maxUnits = _max;
        this.sizeX=x;
        this.sizeY=y;
    }
    minUnits:number;

    maxUnits:number;

    sizeX:number;

    sizeY:number;
}