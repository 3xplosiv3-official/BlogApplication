import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

function Article({ onDeleteArticle, onEditArticle, article }) {
  // Context and other
  const user = useContext(UserContext);
  const navigate = useNavigate();

  // Handlers
  const handleReadMore = (id: number) => {
    navigate(`/articles/${id}`);
  };

  const handleDeleteArticle = async () => {
    // Delete article
  };

  const handleEditArticle = async () => {
    // Edit article
  };

  // Component renders only if user is admin
  const AdminButtons = () => {
    if (!user?.isAdmin) {
      return null;
    }
    return (
      <div className="flex gap-2">
        <button className="button-sm bg-red-100 text-red-400">
          <span className="ic">delete</span>
          <span className="sm:hidden">Delete</span>
        </button>
        <button className="button-sm bg-gray-50 border border-gray-100">
          <span className="ic">edit</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 w-full border border-gray-200 rounded-xl"
      key={article.id}
    >
      {/* Modals for edit and delete */}
      <h2 className="font-semibold break-words">{article.title}</h2>
      <div className="flex flex-col h-full justify-between">
        <div className="mb-4 break-words">
          {article.content}{" "}
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
