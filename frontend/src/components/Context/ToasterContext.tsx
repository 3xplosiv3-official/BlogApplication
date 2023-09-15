import { ReactNode, createContext, useState } from "react";
import { IToast, IToasterContext, ToastStatus } from "../../types";

// Set default context to prevent TS errors
export const ToasterContext = createContext<IToasterContext>({
  toasts: [],
  setToasts: () => {},
  addToast: () => {},
});

// Set provider wrapper
function ToasterProvider({ children }: { children: ReactNode }) {
  // State
  const [toasts, setToasts] = useState<IToast[]>([]);

  // Add toast function
  const addToast = (message: string, type: ToastStatus) => {
    setToasts([...toasts, { message, type }]);
  };

  return (
    <ToasterContext.Provider value={{ toasts, setToasts, addToast }}>
      {children}
    </ToasterContext.Provider>
  );
}

export default ToasterProvider;
