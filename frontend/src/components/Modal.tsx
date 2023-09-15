import { Dispatch, ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";

// Prop interface
interface IProps {
  title: string;
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  children: ReactNode;
}

function Modal({ openState, title, children }: IProps) {
  // States
  const [isOpen, setIsOpen] = openState;

  // Do not render if not open
  if (!isOpen) {
    return null;
  }

  // Handlers
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return createPortal(
    <div
      className="fixed flex items-center justify-center w-full p-4 h-full left-0 top-0 bg-black/50 z-50"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg">
        <span className="font-bold text-lg mb-2">{title}</span>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
