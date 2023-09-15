import { useEffect, useState } from "react";
import { IToast } from "../../ts/interfaces";
import { createPortal } from "react-dom";

// Props Interface
interface IProps {
  messages: IToast[];
  setMessages: (message: IToast[]) => void;
}

function Toaster({ messages, setMessages }: IProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  // Close toast
  const closeToast = (i: number) => {
    setToasts((toasts) => toasts.filter((_, index) => index !== i));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setToasts([...toasts, ...messages]);
      messages.forEach((_, i) => {
        setTimeout(() => {
          closeToast(i);
        }, 3000);
      });
      setMessages([]);
    }
  }, [messages, setMessages, toasts]);

  return createPortal(
    <div className="fixed right-0 top-0 flex max-w-full flex-col gap-2 p-4 z-50 font-[500]">
      {toasts.map((toast, i) => (
        <div
          className={`flex justify-between items-start gap-4 text-white rounded-lg p-4 shadow-md max-w-sm bg-opacity-95 ${
            toast.type > 0 ? "bg-emerald-400" : "bg-red-400"
          }`}
          key={i}
        >
          <span className="break-words max-w-full">{toast.message}</span>
          <button onClick={() => closeToast(i)}>
            <span className="ic">close</span>
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

export default Toaster;
