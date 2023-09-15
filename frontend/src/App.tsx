import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import RouteWrapper from "./components/RouteWrapper";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import ArticlePage from "./routes/ArticlePage";
import AdminPage from "./routes/AdminPage";
import NotFoundPage from "./routes/NotFoundPage";

import { TUser } from "./ts/types";
import { ICredentials, IToast } from "./ts/interfaces";
import axios, { AxiosError } from "axios";
import Toaster from "./components/StateHandler/Toaster";

export const UserContext = createContext<TUser>(null);

function App() {
  // Get user from local storage
  const storedUser = localStorage.getItem("user");

  // States
  const [messages, setMessages] = useState<IToast[]>([]);
  const [user, setUser] = useState<TUser>(
    storedUser ? JSON.parse(storedUser) : null
  );

  // Add Toaster message
  const addMessage = (message: string | number, type: number = 1) => {
    setMessages([...messages, { message, type }]);
  };

  // Logout Handler
  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
  }

  // Login Handler
  const handleLogIn = async (data: ICredentials) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/users/token",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, user_id, status, username } = response.data;

      const userData = {
        id: user_id,
        username: username,
        token: access_token,
        isAdmin: status,
      };

      setUser(userData);
      addMessage("Success", 1);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message || "Unexpected errror", -1);
      console.error("Error while authorization: ", error);
    }
  };

  return (
    <>
      <Toaster messages={messages} setMessages={setMessages} />
      <UserContext.Provider value={user}>
        <Header handleLogOut={handleLogOut} />
        <div className="flex-1 flex flex-col overflow-scroll">
          <Routes>
            <Route
              path="/login"
              element={
                <RouteWrapper user={user} onlyForGuests={true}>
                  <LoginPage handleLogIn={handleLogIn} />
                </RouteWrapper>
              }
            />
            <Route
              path="/admin"
              element={
                <RouteWrapper user={user} onlyForAdmin={true}>
                  <AdminPage />
                </RouteWrapper>
              }
            />
            <Route path="/" element={<MainPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
