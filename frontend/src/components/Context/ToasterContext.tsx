import { ReactNode, createContext, useContext, useState } from "react";
import { IToast, IToasterContext } from "../../ts/interfaces";

export const ToasterContext = createContext<IToasterContext>({
  toasts: [],
  setToasts: () => {},
  addToast: () => {},
});

export const useToaster = () => useContext(ToasterContext);

function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (message: string, type: number) => {
    setToasts([...toasts, { message, type }]);
  };

  return (
    <ToasterContext.Provider value={{ toasts, setToasts, addToast }}>
      {children}
    </ToasterContext.Provider>
  );
}

export default ToasterProvider;
