import { Game } from "@/interfaces/game";
import { GameUnit } from "@/interfaces/gameUnit";
import SlotBoard from "./slotBoard";

interface IGameBoardProp{
    game:Game;
    handle:any
}

export default function GameBoard(prop:IGameBoardProp){
    const cells = [];
    let gridd = new Map();
    prop.game.placedUnitList.forEach(element => {
        element.gameUnit.forEach(element2 => {
            gridd.set([element2.posX, element2.posY].join('::'), element2);
        });
        
    });
    console.log(gridd);
    
    for (let i = 0; i < prop.game.sizeY; i++) {
      const row = []
      for (let j = 0; j < prop.game.sizeX; j++) {
        let element:GameUnit = gridd.get([i, j].join('::'));
        if(element){
            row.push(SlotBoard(element, prop.handle));
        }
        else{
            row.push(SlotBoard(undefined, undefined));
        }
      }
      cells.push(row);
    }
    
    /*const   createGrid = ()=>{
        let gridd = new Map();
        for (let index = 0; index < game.sizeX; index++) {
            for (let index2 = 0; index2 < game.sizeY; index2++) {
                gridd.set([index, index2].join('::'), null);
                
            }
        }
        game.placedUnitList.forEach(element => {
            element.gameUnit.forEach(element2 => {
                gridd.set([element2.posX, element2.posY].join('::'), element2);
            });
            
        });
        let result:any =[];
        gridd.forEach(element => {
            
            if(!element){
                result.push(
                    <div className={styles.gridItem}>
                        null
                    </div>
                )
            }
            else{
                result.push(
                    <div className={styles.gridItem}>
                        SI
                        
                    </div>
                )
            }
        });
        return result;
    }*/
    
    return(
        <div>
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, cellIndex) => (
            <div key={(rowIndex +1 * cellIndex+1) +1} style={{ border: '1px solid black', width: '50px', height: '50px', textAlign: 'center', lineHeight: '50px' }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
    )

}