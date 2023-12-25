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
