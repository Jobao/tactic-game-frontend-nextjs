'use client'
import { useEffect, useState } from "react"
import ListGames from '../../components/listGames'

export default  function Dashboard()
{
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