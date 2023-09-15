import { useCallback, useContext, useEffect, useState } from "react";
import Articles from "../components/Articles/Articles";
import { IArticle, IBaseArticle, ToastStatus } from "../types";
import axios, { AxiosError } from "axios";
import StateHandler from "../components/StateHandler/StateHandler";
import { useLocation } from "react-router-dom";
import EditArticleModal from "../components/Admin/EditArticleModal";
import DeleteArticleModal from "../components/Admin/DeleteArticleModal";
import Pagination from "../components/Pagination";
import { UserContext } from "../components/Context/UserContext";
import { ToasterContext } from "../components/Context/ToasterContext";

function MainPage() {
  // Context
  const { user } = useContext(UserContext);
  const { addToast } = useContext(ToasterContext);

  // Use Location
  const location = useLocation();

  // States
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [article, setArticle] = useState<IArticle | null>(null);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [showDeleteArticleModal, setShowDeleteArticleModal] =
    useState<boolean>(false);
  const [showEditArticleModal, setShowEditArticleModal] =
    useState<boolean>(false);

  // Constants
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") ?? "1";
  const limit = queryParams.get("limit") ?? "12";

  const currentPage = parseInt(page);
  const articlesPerPage = parseInt(limit);

  // Manage articles
  const deleteArticle = async () => {
    if (!article) {
      console.error("No article!");
      return;
    }

    const { id } = article;

    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "/articles/" + id, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      setArticles(articles.filter((x) => x.id !== id));
      addToast("Successfully deleted article", ToastStatus.Success);
      setShowDeleteArticleModal(false);
    } catch (error) {
      const err = error as AxiosError;
      addToast(err.message, ToastStatus.Error);
      console.error("Error in deleting article:", error);
    }
  };

  const editArticle = async (editedArticle: IBaseArticle) => {
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

      addToast("Successfully updated article", ToastStatus.Success);
      setShowEditArticleModal(false);
    } catch (error) {
      const err = error as AxiosError;
      addToast(err.message, ToastStatus.Error);
      console.error("Error in updating article:", error);
    }
  };

  // Callback wrapper for getArticles function
  const getArticles = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/articles",
        {
          params: { page: currentPage, limit: articlesPerPage },
        }
      );

      setArticles(response.data.items);
      setTotalArticles(response.data.total);
    } catch (error: unknown) {
      setError(true);
      console.error("Error in getting articles:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, articlesPerPage, setArticles, setTotalArticles]);

  // Hooks
  useEffect(() => {
    getArticles();
  }, [getArticles, currentPage]);

  const Modals = () => {
    return (
      <>
        <EditArticleModal
          showModal={showEditArticleModal}
          setShowModal={setShowEditArticleModal}
          editArticle={editArticle}
          article={article}
        />
        <DeleteArticleModal
          showModal={showDeleteArticleModal}
          setShowModal={setShowDeleteArticleModal}
          deleteArticle={deleteArticle}
        />
      </>
    );
  };

  return (
    <>
      <Modals />
      <div className="flex h-full flex-col p-4">
        <h1 className="font-bold text-xl px-4 mb-4">
          Articles ({totalArticles})
        </h1>
        <StateHandler state={{ error, loading, length: articles.length }}>
          <StateHandler.Loading>
            <div className="flex flex-col justify-center items-center h-full font-bold">
              Loading...
            </div>
          </StateHandler.Loading>
          <StateHandler.Error>
            <div className="flex flex-1 justify-center flex-col items-center">
              <span className="font-bold mb-4">Error in getting articles!</span>
              <button
                className="button-md bg-gray-50 border border-gray-100"
                onClick={getArticles}
              >
                <span className="ic">refresh</span>
                Try again
              </button>
            </div>
          </StateHandler.Error>
          <StateHandler.Empty>
            <div className="flex flex-col items-center">
              <h1 className="font-bold mb-4">Empty...</h1>
            </div>
          </StateHandler.Empty>
          <StateHandler.Success>
            <Articles
              articles={articles}
              setArticle={setArticle}
              setShowEditModal={setShowEditArticleModal}
              setShowDeleteModal={setShowDeleteArticleModal}
            />
            <Pagination
              itemsPerPage={articlesPerPage}
              totalItems={totalArticles}
              currentPage={currentPage}
            />
          </StateHandler.Success>
        </StateHandler>
      </div>
    </>
  );
}

export default MainPage;
