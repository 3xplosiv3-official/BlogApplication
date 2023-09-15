import { useCallback, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Pagination from "../components/Pagination";
import { IArticle, IToast } from "../ts/interfaces";
import { UserContext } from "../App";
import StateHandler from "../components/StateHandler/StateHandler";
import { useLocation } from "react-router-dom";
import Toaster from "../components/StateHandler/Toaster";
import CreateArticleModal from "../components/Admin/CreateArticleModal";
import EditArticleModal from "../components/Admin/EditArticleModal";
import DeleteArticleModal from "../components/Admin/DeleteArticleModal";
import ArticlesTable from "../components/Admin/ArticlesTable";

function AdminPage() {
  // Context
  const user = useContext(UserContext);

  // Use Location
  const location = useLocation();

  // States
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false);
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);
  const [showEditArticleModal, setShowEditArticleModal] = useState(false);

  const [article, setArticle] = useState<IArticle | null>(null);
  const [messages, setMessages] = useState<IToast[]>([]);

  // Add Toaster message
  const addMessage = (message: string | number, type: number = 1) => {
    setMessages([...messages, { message, type }]);
  };

  // Constants
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const limit = queryParams.get("limit") || "10";

  const currentPage = parseInt(page);
  const articlesPerPage = parseInt(limit);

  // Manage articles
  const deleteArticle = async () => {
    if (!article) return console.error("No article!");
    const { id } = article;
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "/articles/" + id, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      setArticles(articles.filter((x) => x.id !== id));
      addMessage("Successfully deleted article", 1);
      setShowDeleteArticleModal(false);
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
      console.error("Error in deleting article:", error);
    }
  };

  const editArticle = async (editedArticle: Partial<IArticle>) => {
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

      addMessage("Successfully updated article", 1);
      setShowEditArticleModal(false);
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
      console.error("Error in updating article:", error);
    }
  };

  const createArticle = async (newArticle: Partial<IArticle>) => {
    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/articles",
        {
          title: newArticle.title,
          content: newArticle.content,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.token,
            "Content-Type": "application/json",
          },
        }
      );

      setShowCreateArticleModal(false);
      getArticles();
      addMessage("Successfully created article", 1);
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
      console.error("Error while creating article:", error);
    }
  };

  // Get Articles
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
  }, [articlesPerPage, currentPage, setArticles, setTotalArticles]);

  // Hooks
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  // Modals component
  const Modals = () => {
    return (
      <>
        <CreateArticleModal
          showModal={showCreateArticleModal}
          setShowModal={setShowCreateArticleModal}
          createArticle={createArticle}
        />
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
      <div className="h-full">
        <Toaster messages={messages} setMessages={setMessages} />
        {/* <div className="flex flex-col gap-2 h-full w-full max-w-[15rem] border-r border-gray-100 p-4">
        <button className="flex gap-2 bg-gray-100 rounded-lg px-4 py-2 font-semibold">
          <span className="ic">article</span>
          Articles
        </button>
        <button className="flex gap-2 bg-gray-100 rounded-lg px-4 py-2 font-semibold">
          <span className="ic">add</span>
          New article
        </button>
      </div> */}
        <div className="flex flex-col p-4">
          <h1 className="font-bold text-xl px-4 mb-4">
            Manage articles ({totalArticles})
          </h1>
          <button
            className="button-md bg-accent bg-opacity-20 text-accent mb-4"
            onClick={() => setShowCreateArticleModal(true)}
          >
            <span className="ic">add</span>
            Create article
          </button>
          <div className="mx-auto w-full">
            <div className="border border-gray-200 px-4 rounded-lg">
              <StateHandler state={{ error, loading, length: articles.length }}>
                <StateHandler.Loading>
                  <div className="text-center font-bold">Loading...</div>
                </StateHandler.Loading>
                <StateHandler.Error>
                  <div className="flex flex-col items-center py-4">
                    <h1 className="font-bold mb-4">
                      Error in getting articles!
                    </h1>
                    <button
                      className="button-md bg-gray-50 border border-gray-100"
                      onClick={() => window.location.reload()}
                    >
                      <span className="ic">refresh</span>
                      Reload page
                    </button>
                  </div>
                </StateHandler.Error>
                <StateHandler.Empty>
                  <div className="flex flex-col items-center">
                    <h1 className="font-bold mb-4">Empty...</h1>
                  </div>
                </StateHandler.Empty>
                <StateHandler.Success>
                  <ArticlesTable
                    articles={articles}
                    setArticle={setArticle}
                    setShowEditModal={setShowEditArticleModal}
                    setShowDeleteModal={setShowDeleteArticleModal}
                  />
                </StateHandler.Success>
              </StateHandler>
            </div>
            <Pagination
              itemsPerPage={articlesPerPage}
              totalItems={totalArticles}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
