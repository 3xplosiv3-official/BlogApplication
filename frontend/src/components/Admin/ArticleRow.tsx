import { useState, ChangeEvent, useEffect } from "react";
import { IArticle } from "../../ts/interfaces";
import Modal from "../Modal";

// Props Interface
interface IProps {
  article: IArticle;
  onEditArticle: (article: IArticle) => Promise<true | undefined>;
  onDeleteArticle: (id: number) => Promise<true | undefined>;
}

function ArticleRow({ article, onEditArticle, onDeleteArticle }: IProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [isConfirmEditDisabled, setIsConfirmEditDisabled] = useState(true);
  const [editedArticle, setEditedArticle] = useState<IArticle>({
    id: article.id,
    title: article.title,
    content: article.content,
  });

  // Handlers
  const handleDeleteArticle = async () => {
    const success = await onDeleteArticle(article.id);

    if (!success) return;

    setShowDeleteModal(false);
  };

  const handleEditArticle = async () => {
    setIsConfirmEditDisabled(true);

    const success = await onEditArticle(editedArticle);

    if (!success) {
      return setIsConfirmEditDisabled(false);
    }

    setShowEditModal(false);
  };

  const handleEditArticleChange = (
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
      (article.title === editedArticle.title &&
        article.content === editedArticle.content) ||
      !editedArticle.title ||
      !editedArticle.content
    ) {
      setIsConfirmEditDisabled(true);
    } else {
      setIsConfirmEditDisabled(false);
    }
  }, [article, editedArticle, showEditModal]);

  return (
    <>
      <Modal
        openState={[showDeleteModal, setShowDeleteModal]}
        title="Delete Article"
      >
        <span>Are you sure? This cannot be undone!</span>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="button-sm bg-red-100 text-red-400"
            onClick={handleDeleteArticle}
          >
            Confirm
          </button>
          <button
            className="button-sm bg-gray-50 border border-gray-200"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal openState={[showEditModal, setShowEditModal]} title="Edit Article">
        <div className="flex flex-col gap-4">
          <label htmlFor="title">
            <div className="text-xs text-gray-600 mb-2 ml-2">Title</div>
            <input
              className="input w-full"
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              value={editedArticle.title}
              onChange={handleEditArticleChange}
            />
          </label>
          <label htmlFor="content">
            <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
            <textarea
              className="textarea w-full"
              id="content"
              name="content"
              placeholder="Content"
              value={editedArticle.content}
              onChange={handleEditArticleChange}
            />
          </label>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="button-sm bg-accent text-white disabled:opacity-50"
            onClick={handleEditArticle}
            disabled={isConfirmEditDisabled}
          >
            Confirm
          </button>
          <button
            className="button-sm bg-gray-50 border border-gray-200"
            onClick={() => {
              setShowEditModal(false);
              setEditedArticle(article);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <tr>
        <td className="w-[0%] text-xs text-gray-700">
          <span className="sm:block">{new Date().toLocaleDateString()}</span>
          <span className="sm:block">{new Date().toLocaleTimeString()}</span>
        </td>
        <td className="w-[0%] text-xs text-gray-700">
          <span className="sm:block">{new Date().toLocaleDateString()}</span>
          <span className="sm:block">{new Date().toLocaleTimeString()}</span>
        </td>
        <td className="max-w-[150px] truncate">
          <span className="truncate">{article.title}</span>
        </td>
        <td className="max-w-[150px] truncate">
          <span className="truncate">{article.content}</span>
        </td>
        <td className="w-[0%]">
          <div className="flex gap-2 justify-end w-full">
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50
              max-sm:py-2 max-sm:px-4"
              onClick={() => setShowEditModal(true)}
            >
              <span className="ic text-xl">edit</span>
              <span className="sm:hidden font-bold">Edit</span>
            </button>
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-red-50 text-red-400
              max-sm:py-2 max-sm:px-4"
              onClick={() => setShowDeleteModal(true)}
            >
              <span className="ic text-xl">delete</span>
              <span className="sm:hidden font-bold">Delete</span>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ArticleRow;
