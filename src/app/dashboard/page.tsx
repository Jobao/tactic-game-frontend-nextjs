'use client'
import { useEffect, useState } from "react"
import ListGames from '../../components/listGames'

export default  function Dashboard()
{
    
    const getAllGame = async()=>{

    }
    
    //const allGames:any[] = await getAllGame()
    
    
    return(
        <div>
            <h1>Dashboard</h1>
            <br />
            <div>
                <ListGames></ListGames>
            </div>
        </div>
        
    )
}