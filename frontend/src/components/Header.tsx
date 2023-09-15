import { Link } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { UserRole } from "../types";

function Header({ handleLogOut }: { handleLogOut: MouseEventHandler }) {
  const { user } = useContext(UserContext);

  // Conditionally render Sign Up or Sign In button
  const AuthButton = () => {
    if (user)
      return (
        <div>
          <button
            className="button-sm border border-gray-100 bg-gray-50"
            onClick={handleLogOut}
          >
            <span className="ic">move_item</span>
            <span className="max-sm:hidden">Sign Out</span>
          </button>
        </div>
      );

    return (
      <div>
        <Link
          className="button-sm border border-gray-100 bg-gray-50"
          to="/login"
        >
          <span className="ic">login</span>
          <span className="max-sm:hidden">Sign In</span>
        </Link>
      </div>
    );
  };

  // Render only if user is admin
  const ManageButton = () => {
    if (!user) return;
    if (user.role < UserRole.Admin) return;
    return (
      <li>
        <Link className="font-[600]" to={"/admin"}>
          Manage
        </Link>
      </li>
    );
  };

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 z-50 flex justify-between items-center px-10 py-6 max-sm:px-6">
        <Link to="/">
          <span className="font-bold text-xl">BLOG APP</span>
        </Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <ManageButton />
            <li>
              <AuthButton />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
