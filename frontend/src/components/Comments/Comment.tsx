import { useContext, useState } from "react";
import { IComment } from "../../ts/interfaces";
import Modal from "../Modal";
import { UserContext } from "../../App";

//Props Interface
interface IProps {
  onDeleteComment: (id: number) => Promise<true | undefined>;
  comment: IComment;
}

function Comment({ onDeleteComment, comment }: IProps) {
  // Context
  const user = useContext(UserContext);

  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handlers
  const handleDeleteComment = async (id: number) => {
    const success = await onDeleteComment(id);
    if (!success) return;

    setShowDeleteModal(false);
  };

  // Renders only if user is admin
  const DeleteButton = () => {
    if (!user?.isAdmin) return;
    return (
      <button
        className="button-sm text-red-400 bg-red-50"
        onClick={() => setShowDeleteModal(true)}
      >
        <span className="ic">delete</span>
        <span className="max-sm:hidden">Delete</span>
      </button>
    );
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-100">
      <Modal
        openState={[showDeleteModal, setShowDeleteModal]}
        title="Delete Comment"
      >
        <span>Are you sure? This cannot be undone!</span>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="button-sm bg-red-100 text-red-400"
            onClick={() => handleDeleteComment(comment.id)}
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
      <div className="flex flex-col py-4">
        <span className="flex gap-2 items-center text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}{" "}
          {new Date(comment.createdAt).toLocaleTimeString()}
        </span>
        <div className="flex items-center gap-1">
          <span className="ic">keyboard_arrow_right</span> {comment.content}
        </div>
      </div>
      <DeleteButton />
    </div>
  );
}

export default Comment;
