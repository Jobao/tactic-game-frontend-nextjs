import { Game } from "@/interfaces/game";
import { useState } from "react";

export default function GameBoard(game:Game){
    const [grid, setGrid] = useState<{x:Number, y:Number}>()
    //Usar Map  !! aca quede    
    const drawGrid = ()=>{
        let ocuppied:{x:number, y:number}[]  = [];
        game.placedUnitList.forEach(element => {
            element.gameUnit.forEach(element2 => {
                ocuppied.push({x: element2.posX, y:element2.posY});
            });
            
        });
        let grid 

        return ocuppied;
    }

    return(
        <div>
            <p>soy el Board y mi id es {game._id}</p>
            <p>{game.placedUnitList[0].gameUnit[0].unitBase_uuid}</p>

            <div></div>
        </div>
    )

}