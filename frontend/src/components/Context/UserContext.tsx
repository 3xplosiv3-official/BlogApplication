import { ReactNode, createContext, useState } from "react";
import { IUserContext, TUser } from "../../types";

// Set default value for context to prevent TS errors
export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

// Set provider wrapper
function UserProvider({ children }: { children: ReactNode }) {
  // Getting stored user from local storage
  const storedUser = localStorage.getItem("user");

  // State (checking if user exists in local storage and set null if does not)
  const [user, setUser] = useState<TUser>(
    storedUser ? JSON.parse(storedUser) : null
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
