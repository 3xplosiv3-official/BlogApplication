import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { TUser } from "../ts/types";

interface IProps {
  user: TUser;
  onlyForGuests?: boolean;
  onlyForAdmin?: boolean;
  children: ReactNode;
}

function RouteWrapper({ user, onlyForGuests, onlyForAdmin, children }: IProps) {
  // If both props passed throw an error
  if (onlyForGuests && onlyForAdmin) {
    throw new Error("Cannot set onlyForGuests and onlyForRoles together!");
  }

  // Navigate
  const navigate = useNavigate();

  // Hooks
  useEffect(() => {
    if (onlyForGuests && user) {
      navigate("/");
    }

    if (onlyForAdmin && !user?.isAdmin) {
      navigate("/login");
    }
  }, [navigate, user, onlyForGuests, onlyForAdmin]);

  return children;
}

export default RouteWrapper;
