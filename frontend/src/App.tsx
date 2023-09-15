import { Routes, Route } from "react-router-dom";
import RouteWrapper from "./components/RouteWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import ArticlePage from "./routes/ArticlePage";
import AdminPage from "./routes/AdminPage";
import NotFoundPage from "./routes/NotFoundPage";
import {
  ICredentials,
  TUser,
  IUserResponse,
  ToastStatus,
} from "./types";
import axios, { AxiosError } from "axios";
import Toaster from "./components/Toaster/Toaster";
import { UserContext } from "./components/Context/UserContext";
import { ToasterContext } from "./components/Context/ToasterContext";
import { useContext } from "react";

function App() {
  // Contexts
  const { user, setUser } = useContext(UserContext);
  const { addToast } = useContext(ToasterContext);

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

      const { access_token, user_id, status, username }: IUserResponse =
        response.data;

      const userData: TUser = {
        id: user_id,
        username: username,
        token: access_token,
        role: status,
      };

      setUser(userData);
      addToast("Success", ToastStatus.Success);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      const err = error as AxiosError;
      addToast(err.message || "Unexpected errror", ToastStatus.Error);
      console.error("Error while authorization: ", error);
    }
  };

  return (
    <>
      <Toaster />
      <Header handleLogOut={handleLogOut} />
      <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-scroll">
        <Routes>
          <Route
            path="/login"
            element={
              <RouteWrapper user={user} onlyForRoles={[0]}>
                <LoginPage handleLogIn={handleLogIn} />
              </RouteWrapper>
            }
          />
          <Route
            path="/admin"
            element={
              <RouteWrapper user={user} onlyForRoles={[1]}>
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
    </>
  );
}

export default App;
