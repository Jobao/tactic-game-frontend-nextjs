'use client'
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Login(){
    const [user, setUser] = useState('');
    const [pass, setPass] =  useState('');
    const [jwt, setjwt] = useState('');
    const router =  useRouter();

    const onChangeUser = async(e)=>{
        setUser(e.target.value)
    }
    const onChangePass = async(e)=>{
        setPass(e.target.value)
    }

    const handleLogin = async()=>{
        //
        const response = await fetch("http://localhost:8081/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ user, pass})
        })
        let token =  (await response.json())
        if (token.access_token) {
            sessionStorage.setItem('jwt',token.access_token)
             router.push("http://localhost:3001/dashboard")
        //NextResponse.redirect('http://localhost:3001/dashboard').headers.set('autorization', token.access_token);
        }
    }
      return(
        <div>
        <input type="text" name="userTxtLogin" id="userLoginTXT" onChange={onChangeUser} />
        <input type="text" name="userPassLogin" id="userLoginPass" onChange={onChangePass } />
        <button onClick={handleLogin}>Login</button>
    </div>
    );
}