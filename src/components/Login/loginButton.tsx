"use client";
import { Login } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  function handleLogin() {
    let token = Login({
      user: (document.getElementById("user") as HTMLInputElement).value,
      pass: (document.getElementById("pass") as HTMLInputElement).value,
    });
    token.then((x) => {
      if (x.access_token) {
        sessionStorage.setItem("jwt", x.access_token);
        sessionStorage.setItem("user_uuid", x.user_uuid);
        router.push("http://localhost:3001/dashboard");
      }
    });
  }

  return (
    <button
      onClick={() => handleLogin()}
      className=" border-x-2 shadow-sm bg-slate-300"
    >
      Login
    </button>
  );
}
