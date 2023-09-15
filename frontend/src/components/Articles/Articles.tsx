import { IArticle } from "../../ts/interfaces";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

// Props Interface
interface IProps {
  articles: IArticle[];
  setArticle: (article: IArticle) => void;
  setShowEditModal: (boolean: boolean) => void;
  setShowDeleteModal: (boolean: boolean) => void;
}

function Articles({
  articles,
  setArticle,
  setShowEditModal,
  setShowDeleteModal,
}: IProps) {
  // Context
  const user = useContext(UserContext);

  // Navigate
  const navigate = useNavigate();

  // Helper function
  const truncate = (string: string, length: number) => {
    if (string.length > length) {
      return string.substring(0, length) + "...";
    }
    return string;
  };

  // Handlers
  const handleReadMore = (id: number) => {
    navigate(`/articles/${id}`);
  };

  // Renders only if user is admin
  const AdminButtons = ({ article }: { article: IArticle }) => {
    if (!user?.isAdmin) return;
    return (
      <div className="flex gap-2">
        <button
          className="button-sm bg-red-100 text-red-400"
          onClick={() => {
            setArticle(article);
            setShowDeleteModal(true);
          }}
        >
          <span className="ic">delete</span>
          <span className="sm:hidden">Delete</span>
        </button>
        <button
          className="button-sm bg-gray-50 border border-gray-100"
          onClick={() => {
            setArticle(article);
            setShowEditModal(true);
          }}
        >
          <span className="ic">edit</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>
    );
  };

  // Mapped articles component
  const ArticlesMap = () =>
    articles.map((article) => (
      <div
        className="flex flex-col gap-4 p-4 w-full border border-gray-200 rounded-xl"
        key={article.id}
      >
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
          <AdminButtons article={article} />
        </div>
      </div>
    ));
  return (
    <>
      <div
        className="grid grid-cols-3 grid-rows-1 grid-flow-dense gap-4
      max-sm:grid-cols-1"
      >
        <ArticlesMap />
      </div>
    </>
  );
}

export default Articles;
