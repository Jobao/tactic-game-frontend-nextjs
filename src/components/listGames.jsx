import { useEffect, useState } from "react"
export default function ListGames(){
    const [allGames, setAllGames] = useState([])

    useEffect(()=>{
        let allg;
        if(sessionStorage.getItem('jwt')){
            const response = fetch("http://localhost:8081/game/allgamesbyuser",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': sessionStorage.getItem('jwt') || '',
            },
        }).then((x)=>{
            console.log(x);
            x.json().then((y) =>{setAllGames(y)
            })
        })
            
        }
        else{
            console.log('no');
            
        }
    
    }, [])

    function handleClickVerDetalleJuego(uuid_game){
        //Aca me quede, al clickear, entrar al detalle del juego
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
                                    <td><button type="submit" onClick={handleClickVerDetalleJuego} >Ver Juego</button>    </td>
                                    
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