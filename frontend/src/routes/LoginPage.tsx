import { ChangeEvent, useState } from "react";
import { ICredentials, InitialCredentials } from "../types";

function LoginPage({
  handleLogIn,
}: {
  handleLogIn: (credentials: ICredentials) => void;
}) {
  // States
  const [credentials, setCredentials] = useState(InitialCredentials);

  // Change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-4">
      <h1 className="font-bold text-2xl mb-4">Sign In</h1>
      <form className="flex flex-col w-full max-w-md gap-4">
        <input
          className="input"
          value={credentials.username}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className="input"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="button-lg bg-accent text-white disabled:opacity-50"
          disabled={!credentials.username || !credentials.password}
          onClick={(e) => {
            e.preventDefault();
            handleLogIn(credentials);
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
