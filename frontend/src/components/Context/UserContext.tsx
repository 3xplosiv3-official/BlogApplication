import { ReactNode, createContext, useContext, useState } from "react";
import { IUserContext } from "../../ts/interfaces";

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

function UserProvider({ children }: { children: ReactNode }) {
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
