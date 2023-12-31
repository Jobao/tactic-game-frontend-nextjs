import LoginButton from "./loginButton";
export default function LoginComponent() {
  return (
    <div>
      <input
        type="text"
        name=""
        id="user"
        placeholder="user"
        className=" border"
      />
      <input
        type="password"
        name=""
        id="pass"
        placeholder="pass"
        className=" border"
      />
      <LoginButton></LoginButton>
    </div>
  );
}
