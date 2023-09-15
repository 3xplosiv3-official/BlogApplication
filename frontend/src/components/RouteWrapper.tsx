import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { TUser, UserRole } from "../types";

interface IProps {
  user: TUser;
  onlyForRoles: UserRole[];
  children: ReactNode;
}

function RouteWrapper({ user, onlyForRoles, children }: IProps) {
  if (onlyForRoles.includes(UserRole.Guest) && onlyForRoles.length > 1)
    throw new Error(
      "onlyForRoles cannot contin other roles together with 0 (unauthorized)!"
    );
  // Navigate
  const navigate = useNavigate();
console.log(user)
  // Hooks
  useEffect(() => {
    if (!user && !onlyForRoles.includes(UserRole.Guest)) {
      return navigate("/login");
    }
    if (user && !onlyForRoles.includes(user?.role)) {
      return navigate("/");
    }
  }, [navigate, user, onlyForRoles]);

  return children;
}

export default RouteWrapper;
