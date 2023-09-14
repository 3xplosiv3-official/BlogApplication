import { IArticle } from "../../ts/interfaces";
import { useNavigate } from "react-router-dom";
import { useState, useContext, ChangeEvent, useEffect } from "react";
import { UserContext } from "../../App";
import Modal from "../Modal";

interface IProps {
  onEditArticle: (article: IArticle) => Promise<true | undefined>;
  onDeleteArticle: (id: number) => Promise<true | undefined>;
  article: IArticle;
}

function Article({ onDeleteArticle, onEditArticle, article }: IProps) {
  // Context and other
  const user = useContext(UserContext);
  const navigate = useNavigate();

  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [isConfirmEditDisabled, setIsConfirmEditDisabled] = useState(true);
  const [editedArticle, setEditedArticle] = useState<IArticle>({
    id: article.id,
    title: article.title,
    content: article.content,
  });

  // Handlers
  const handleReadMore = (id: number) => {
    navigate(`/articles/${id}`);
  };

  const handleDeleteArticle = async () => {
    const success = await onDeleteArticle(article.id);

    if (!success) return;

    onDeleteArticle(article.id);
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

  // Component renders only if user is admin
  const AdminButtons = () => {
    if (!user?.isAdmin) {
      return null;
    }
    return (
      <div className="flex gap-2">
        <button
          className="button-sm bg-red-100 text-red-400"
          onClick={() => setShowDeleteModal(true)}
        >
          <span className="ic">delete</span>
          <span className="sm:hidden">Delete</span>
        </button>
        <button
          className="button-sm bg-gray-50 border border-gray-100"
          onClick={() => setShowEditModal(true)}
        >
          <span className="ic">edit</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>
    );
  };

  // Helper function
  const truncate = (string: string, length: number) => {
    if (string.length > length) {
      return string.substring(0, length) + "...";
    }
    return string;
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 w-full border border-gray-200 rounded-xl"
      key={article.id}
    >
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
            <div className="text-xs text-gray-500 mb-2 ml-2">
              Title
            </div>
            <input
              className="input w-full"
              type="text"
              id="title"
              placeholder="Title"
              name="title"
              value={editedArticle.title}
              onChange={handleEditArticleChange}
            />
          </label>
          <label htmlFor="content">
            <div className="text-xs text-gray-500 mb-2 ml-2">
              Content
            </div>
            <textarea
              className="textarea w-full"
              name="content"
              id="content"
              value={editedArticle.content}
              placeholder="Content"
              onChange={handleEditArticleChange}
            />
          </label>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="button-sm bg-accent bg-opacity-20 text-accent disabled:opacity-50"
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
      <h2 className="font-semibold break-words">
        {truncate(article.title, 30)}
      </h2>
      <div className="flex flex-col h-full justify-between">
        <div className="mb-4 break-words">
          {truncate(article.content, 100)}{" "}
          <div className="inline-block">
            <button
              className="font-semibold flex items-center gap-1"
              onClick={() => handleReadMore(article.id)}
            >
              Read more
              <span className="ic">east</span>
            </button>
          </div>
        </div>
        <AdminButtons />
      </div>
    </div>
  );
}

export default Article;
