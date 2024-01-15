import router from "next/router";
import { Game, GameUnit, LoginData, MoveAction } from "./interfaces";

export async function Login(
  loginData: LoginData
): Promise<{ access_token: string; user_uuid: string }> {
  const response = await fetch("http://localhost:8081/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  let token = await response.json();
  return token;
}

export async function MovePlayer(unit_uuid:string, game_uuid:string, x:number, y:number){
  let result = false;
  let response = fetch(
    "http://localhost:8081/game/" + game_uuid + "/action",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("jwt") || "",
      },
      body: JSON.stringify({
        unit_uuid: unit_uuid,
        action: {
          type: 'MOVE',
          target: {
            x: x,
            y: y,
          },
        },
      }),
    }
  );
  await response.then(async (x) => {
    if (x.status === 201) {
       await x.json().then((res) => {
        if (res.status === "OK") {
          result = true;
          console.log('inside response');
          
          //props.handleUpdate();
        }
      });
    }
  });
  console.log(result);
  
  return result
}
