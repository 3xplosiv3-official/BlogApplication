import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal";
import { IArticle } from "../../ts/interfaces";

interface IProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  createArticle: (newArticle: Partial<IArticle>) => void;
}

function CreateArticleModal({
  showModal,
  setShowModal,
  createArticle,
}: IProps) {
  //States
  const [isSubmitDisabled, setIsSibmitDisabled] = useState(true);
  const [newArticle, setNewArticle] = useState<Partial<IArticle>>({
    title: "",
    content: "",
  });

  // Two-way binding
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value,
    });
  };

  // Hooks
  useEffect(() => {
    if (!newArticle.title || !newArticle.content) {
      setIsSibmitDisabled(true);
    } else {
      setIsSibmitDisabled(false);
    }
  }, [newArticle]);

  return (
    <Modal title="Create Article" openState={[showModal, setShowModal]}>
      <form
        className="flex flex-col w-full max-w-md gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          createArticle(newArticle);
        }}
      >
        <label htmlFor="title">
          <div className="text-xs text-gray-600 mb-2 ml-2">Title</div>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title"
            value={newArticle.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="content">
          <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
          <textarea
            className="textarea w-full"
            placeholder="Text"
            name="content"
            value={newArticle.content}
            onChange={handleChange}
          />
        </label>
        <div className="flex gap-4 max-sm:flex-col">
          <button
            className="button-md bg-accent bg-opacity-20 text-accent w-full disabled:opacity-50"
            disabled={isSubmitDisabled}
          >
            Create article
            <span className="ic">east</span>
          </button>
          <button
            className="button-md bg-red-50 text-red-400"
            onClick={() => setShowModal(false)}
          >
            Cancel
            <span className="ic">close</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateArticleModal;
