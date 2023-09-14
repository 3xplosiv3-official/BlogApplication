import Article from "./Article";
import Pagination from "../Pagination";
import { IArticle, IToast } from "../../ts/interfaces";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserContext } from "../../App";
import Toaster from "../StateHandler/Toaster";

// Props Interface
interface IProps {
  articles: IArticle[];
  setArticles: Dispatch<SetStateAction<IArticle[]>>;
  totalArticles: number;
  articlesPerPage: number;
  currentPage: number;
}

function Articles({
  articles,
  setArticles,
  totalArticles,
  articlesPerPage,
  currentPage,
}: IProps) {
  // Context
  const user = useContext(UserContext);

  // States
  const [messages, setMessages] = useState<IToast[]>([]);

  // Add Toaster message
  const addMessage = (message: string | number, type: number = 1) => {
    setMessages([...messages, { message, type }]);
  };

  // Functions to manage Articles
  const deleteArticle = async (id: number) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "/articles/" + id, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      setArticles(articles.filter((x) => x.id !== id));
      addMessage("Successfully deleted", 1);

      return true;
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message || "Unexpected errror", -1);
      console.error("Error in deleting article:", error);
    }
  };

  const editArticle = async (editedArticle: IArticle) => {
    try {
      await axios.put(
        import.meta.env.VITE_BASE_URL + "/articles/" + editedArticle.id,
        editedArticle,
        {
          headers: {
            Authorization: "Bearer " + user?.token,
            "Content-Type": "application/json",
          },
        }
      );

      setArticles(
        articles.map((article) =>
          article.id === editedArticle.id
            ? { ...article, ...editedArticle }
            : article
        )
      );

      addMessage("Successfully edited", 1);

      return true;
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message || "Unexpected errror", -1);
      console.error("Error in updating article:", error);
    }
  };

  if (!articles.length) {
    return <div className="text-center font-bold">Empty...</div>;
  }

  return (
    <>
      <Toaster messages={messages} setMessages={setMessages} />
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
      <Pagination
        itemsPerPage={articlesPerPage}
        totalItems={totalArticles}
        currentPage={currentPage}
      />
    </>
  );
}

export default Articles;
