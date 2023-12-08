import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { indexFrontend } from "@/app/constants";
export default function ListGames(){
    const [allGames, setAllGames] = useState([])
    const router =  useRouter();

    useEffect(()=>{
        if(sessionStorage.getItem('jwt')){
            const response = fetch("http://localhost:8081/game/allgamesbyuser",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': sessionStorage.getItem('jwt') || '',
            },
        }).then((x)=>{
            if (x.status === 200) {
                x.json().then((y) =>{setAllGames(y)})
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
    
    }, [])

    function handleClickVerDetalleJuego(uuid_game){
        router.push("http://localhost:3001/dashboard/games/" + uuid_game)
    }

    if(allGames.length > 0){
        return(
            <table border={1}>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>isStart</th>
                        <th>isEnd</th>
                        </tr>
                    </thead>

                    <tbody>
                    {allGames.map((x)=>{
                        return (
                                <tr key={x._id}>
                                    <td>{x._id}</td>
                                    <td>{x.isStart ? "SI":"NO"}</td>
                                    <td>{x.isEnd? "SI":"NO"}</td>
                                    <td><button type="submit" onClick={function() {handleClickVerDetalleJuego(x._id)}} >Ver Juego</button>    </td>
                                    
                                </tr>
                                
                            
                        )
                    })}
                    </tbody>
                    
                </table>
        )
    }
    else{
        return(
            <div>
                <p>No tienes juegos !</p>
            </div>
        )
    }
}