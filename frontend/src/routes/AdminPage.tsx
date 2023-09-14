import {
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { IArticle, IBaseArticle } from "../ts/interfaces";
import { UserContext } from "../App";

function AdminPage() {
  // Context
  const user = useContext(UserContext);

  // States
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Functions to manage Articles
  const deleteArticle = async (id: number) => {
  //  Delete article
  };

  const editArticle = async (editedArticle: IArticle) => {
    // Edit article
  };

  const createArticle = async (e: SyntheticEvent) => {
    // Create article
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


  // Article rows for table
  const rows = articles.map((article) => (
    
  ));

  return (
    <div className="h-full">
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
        >
          <span className="ic">add</span>
          Create article
        </button>
        <div className="mx-auto w-full">
          <div className="border border-gray-200 px-4 rounded-lg">
                  {/* Conditional content render */}
          </div>
        {/* Pagination */}
        </div>
      </div>
      {/* Modals for edit and delete articles */}
    </div>
  );
}

export default AdminPage;
