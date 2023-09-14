import {
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
import Pagination from "../components/Pagination";
import { IArticle, IBaseArticle, IToast } from "../ts/interfaces";
import { UserContext } from "../App";
import ArticleRow from "../components/Admin/ArticleRow";
import StateHandler from "../components/StateHandler/StateHandler";
import Modal from "../components/Modal";
import { useLocation } from "react-router-dom";
import Toaster from "../components/StateHandler/Toaster";

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
  const [isConfirmCreateDisabled, setIsConfirmCreateDisabled] = useState(true);

  const [newArticle, setNewArticle] = useState<IBaseArticle>({
    title: "",
    content: "",
  });

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

  // Functions to manage Articles
  const deleteArticle = async (id: number) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "/articles/" + id, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      setArticles(articles.filter((x) => x.id !== id));
      addMessage("Successfully deleted article", 1);

      return true;
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
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

      addMessage("Successfully updated article", 1);
      return true;
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
      console.error("Error in updating article:", error);
    }
  };

  const createArticle = async (e: SyntheticEvent) => {
    e.preventDefault();
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

  // Callback wrapper for getArticles
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
  }, [articlesPerPage, currentPage]);

  // Hooks
  useEffect(() => {
    getArticles();
  }, [getArticles, currentPage]);

  useEffect(() => {
    if (!newArticle.title || !newArticle.content) {
      setIsConfirmCreateDisabled(true);
    } else {
      setIsConfirmCreateDisabled(false);
    }
  }, [newArticle, showCreateArticleModal]);

  // Article rows for table
  const rows = articles.map((article) => (
    <ArticleRow
      key={article.id}
      article={article}
      onEditArticle={editArticle}
      onDeleteArticle={deleteArticle}
    />
  ));

  return (
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
                  <h1 className="font-bold mb-4">Error in getting articles!</h1>
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
                <table className="w-full responsive-table">
                  <thead className="text-left">
                    <tr className="border-b border-gray-200 [&>th]:py-4 [&>th]:px-2 [&>th]:text-xs  [&>th]:font-[500] text-gray-500">
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Title</th>
                      <th>Content</th>
                    </tr>
                  </thead>
                  <tbody className="sm:divide-y sm:divide-gray-200 text-left">
                    {rows}
                  </tbody>
                </table>
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
      <Modal
        title="Create Article"
        openState={[showCreateArticleModal, setShowCreateArticleModal]}
      >
        <form className="flex flex-col w-full max-w-md gap-4">
          <label htmlFor="title">
            <div className="text-xs text-gray-600 mb-2 ml-2">Title</div>
            <input
              className="input w-full"
              id="title"
              type="text"
              placeholder="Title"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
          </label>
          <label htmlFor="content">
            <div className="text-xs text-gray-600 mb-2 ml-2">Content</div>
            <textarea
              className="textarea w-full"
              id="content"
              placeholder="Text"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
          </label>
          <div className="flex gap-4 max-sm:flex-col">
            <button
              className="button-md bg-accent bg-opacity-20 text-accent w-full disabled:opacity-50"
              onClick={createArticle}
              disabled={isConfirmCreateDisabled}
            >
              Create article
              <span className="ic">east</span>
            </button>
            <button
              className="button-md bg-red-50 text-red-400"
              onClick={() => setShowCreateArticleModal(false)}
            >
              Cancel
              <span className="ic">close</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminPage;
