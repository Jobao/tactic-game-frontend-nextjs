import { GameUnit } from "@/interfaces/gameUnit"
import React, { useState } from "react"

interface IPropsUnitDetails{
    selectedUnit:GameUnit | undefined
    handle:any;
}

export default function UnitDetails(props:IPropsUnitDetails){
    const [show, setShow] = useState(true);
    if (props) {
        if(props.selectedUnit){
            return(
                
                <div>
                    {props.selectedUnit.currentMP}
                    <button type="button" onClick={()=>{props.handle(undefined); setShow(!show)}}>X</button>
                </div>
            )
        }
        else{
            return(
                <>
                </>
            )
        }
    }

}