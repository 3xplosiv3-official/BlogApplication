import { ChangeEvent, useState } from "react";
import { ICredentials } from "../ts/interfaces";

function LoginPage({
  handleLogIn,
}: {
  handleLogIn: (data: ICredentials) => void;
}) {
  // States
  const [data, setData] = useState({ username: "", password: "" });

  // Change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="font-bold text-2xl mb-4">Sign In</h1>
      <form className="flex flex-col w-full max-w-md gap-4">
        <input
          className="input"
          value={data.username}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="input"
          value={data.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="button-lg bg-accent text-white disabled:opacity-50"
          disabled={!data.username || !data.password}
          onClick={(e) => {
            e.preventDefault();
            handleLogIn(data);
          }}
        >
          Sign In
          <span className="ic">east</span>
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
