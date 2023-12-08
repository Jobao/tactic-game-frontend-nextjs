'use client'
import { indexFrontend } from "@/app/constants";
import GameBoard from "@/components/board";
import  { useRouter,useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function GamePage(){

    const [gameState, setGameState] = useState({_id:'', sizeX:0});
    const router =  useRouter();
    const params = useParams()

    useEffect(()=>{
        try {
            if(sessionStorage.getItem('jwt')){
                const response = fetch("http://localhost:8081/game/" + params.id,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': sessionStorage.getItem('jwt') || '',
                },
            }).then((x)=>{
                if (x.status === 200) {
                    x.json().then((y) =>{setGameState(y)})
                }
                else{
                    if(x.status === 401){
                        sessionStorage.removeItem('jwt')
                        router.push(indexFrontend)
                    }
                }
            })
                
            }
            else{
                router.push(indexFrontend)
                
            }
        } catch (error) {
            console.log(error);
            
        }
    
    }, [])
    if(gameState._id !== ''){
        return(
            <div>{gameState._id}
            <GameBoard _id={gameState._id} sizeX={gameState.sizeX}></GameBoard>
                <p>{gameState.sizeX}</p>
            </div>
        )
    }
    else{
        return(
            <div>ERROR</div>
        )
    }

}