export default function GameBoard(props:{_id:string, sizeX:number}){
    console.log(props);
    
    return(
        <div>
            <p>soy el Board y mi id es {props._id}</p>
            <div></div>
        </div>
    )

}