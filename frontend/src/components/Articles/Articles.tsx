import Article from "./Article";
import { IArticle } from "../../ts/interfaces";
import { useContext } from "react";
import { UserContext } from "../../App";

function Articles({
  articles,
}) {
  // Context
  const user = useContext(UserContext);

  // Functions to manage Articles
  const deleteArticle = async (id: number) => {
    // Delete articles
  };

  const editArticle = async (editedArticle: IArticle) => {
    // Edit article
  };

  if (!articles.length) {
    return <div className="text-center font-bold">Empty...</div>;
  }

  return (
    <>
      <div
        className="grid grid-cols-3 grid-rows-1 grid-flow-dense gap-4
      max-sm:grid-cols-1"
      >
        {articles.map((article) => (
          <Article
            onEditArticle={editArticle}
            onDeleteArticle={deleteArticle}
            article={article}
            key={article.id}
          />
        ))}
      </div>
      {/* Pagination */}
    </>
  );
}

export default Articles;
