import { Routes, Route } from "react-router-dom";
import RouteWrapper from "./components/RouteWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import ArticlePage from "./routes/ArticlePage";
import AdminPage from "./routes/AdminPage";
import NotFoundPage from "./routes/NotFoundPage";
import { ICredentials, IUser, IUserResponse } from "./ts/interfaces";
import axios, { AxiosError } from "axios";
import Toaster from "./components/Toaster/Toaster";
import { useUser } from "./components/Context/UserContext";
import { useToaster } from "./components/Context/ToasterContext";

function App() {
  // Contexts
  const { user, setUser } = useUser();
  const { addToast } = useToaster();

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

      const userData: IUser = {
        id: user_id,
        username: username,
        token: access_token,
        isAdmin: status,
      };

      setUser(userData);
      addToast("Success", 1);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      const err = error as AxiosError;
      addToast(err.message || "Unexpected errror", -1);
      console.error("Error while authorization: ", error);
    }
  };

  return (
    <>
      <Toaster />
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
    </>
  );
}

export default App;
