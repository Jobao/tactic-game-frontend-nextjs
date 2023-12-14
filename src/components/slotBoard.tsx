import { GameUnit } from "@/interfaces/gameUnit";
import React from "react";
import styles from "../app/dashboard/games/[id]/styles.module.css"

export default function SlotBoard(prop:GameUnit |undefined, handle:any){
    if(prop){
        return(
            <div className={styles.ocupiedSlot}>
                <button type="button" onClick={()=>{
                    handle(prop)
                }}>OK</button>
            </div>
        )
    }
    else{
        return(
            <div className={styles.emptySlot}>
                .
            </div>
        )
    }

}