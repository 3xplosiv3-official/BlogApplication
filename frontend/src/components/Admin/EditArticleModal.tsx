import Modal from "../Modal";
import { IArticle, IBaseArticle } from "../../types";
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
  editArticle: (editedArticle: IBaseArticle) => Promise<void>;
  article: IArticle | null;
}

function EditArticleModal({
  showModal,
  setShowModal,
  editArticle,
  article,
}: IProps) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [editedArticle, setEditedArticle] = useState<IBaseArticle | null>(
    article
  );

  // Two-way binding
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedArticle) return;
    const { name, value } = e.target;
    setEditedArticle({
      ...editedArticle,
      [name]: value,
    });
  };

  // Hooks
  useEffect(() => {
    if (
      (editedArticle?.title &&
      editedArticle?.content &&
      editedArticle?.description) &&
      (article?.title !== editedArticle.title ||
      article?.content !== editedArticle.content ||
      article?.description !== editedArticle.description)
     
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [article, editedArticle]);

  if (!editedArticle) return;
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
        <label htmlFor="description">
          <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
          <textarea
            className="textarea w-full"
            name="description"
            placeholder="Description"
            value={editedArticle.description}
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
