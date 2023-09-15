import Modal from "../Modal";
import { IArticle } from "../../ts/interfaces";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  editArticle: (editedArticle: IArticle) => void;
  article: IArticle | null;
}

function EditArticleModal({
  showModal,
  setShowModal,
  editArticle,
  article,
}: IProps) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [editedArticle, setEditedArticle] = useState<IArticle>(
    article ? article : { id: NaN, title: "", content: "" }
  );

  // Two-way binding
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedArticle({
      ...editedArticle,
      [name]: value,
    });
  };

  // Hooks
  useEffect(() => {
    if (
      (article?.title === editedArticle.title &&
        article.content === editedArticle.content) ||
      !editedArticle.title ||
      !editedArticle.content
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [article, editedArticle]);

  return (
    <Modal openState={[showModal, setShowModal]} title="Edit Article">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          editArticle(editedArticle);
        }}
      >
        <label htmlFor="title">
          <div className="text-xs text-gray-600 mb-2 ml-2">Title</div>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title"
            value={editedArticle.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="content">
          <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
          <textarea
            className="textarea w-full"
            name="content"
            placeholder="Content"
            value={editedArticle.content}
            onChange={handleChange}
          />
        </label>
        <div className="flex gap-2 justify-end">
          <button
            className="button-sm bg-accent text-white disabled:opacity-50"
            type="submit"
            disabled={isSubmitDisabled}
          >
            Confirm
          </button>
          <button
            className="button-sm bg-gray-50 border border-gray-200"
            type="button"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditArticleModal;
