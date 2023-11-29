'use client'
import { useState } from "react";

export default function Login(){
    const [user, setUser] = useState('');
    const [pass, setPass] =  useState('')

    const postLogin = async () =>{
        const response = await fetch("http://localhost:8081/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({ user, pass})
        })
        let token =  (await response.json())
        if(token.access_token){
            console.log(token);
        }
        else{
            console.log('error')
        }
        
    }

    const onChangeUser = async(e)=>{
        setUser(e.target.value)
    }
    const onChangePass = async(e)=>{
        setPass(e.target.value)
    }
    return (
        <div>
            
            <input type="text" name="userTxtLogin" id="userLoginTXT" onChange={onChangeUser} />
            <input type="text" name="userPassLogin" id="userLoginPass" onChange={onChangePass } />
            <button onClick={postLogin}  >Login</button>
        </div>
    );
}