import { useCallback, useEffect, useState } from "react";
import Articles from "../components/Articles/Articles";
import { IArticle } from "../ts/interfaces";
import axios from "axios";
import StateHandler from "../components/StateHandler/StateHandler";
import { useLocation } from "react-router-dom";
function MainPage() {
  // Use Location
  const location = useLocation();
  // States
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Constants
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || "1";
  const limit = queryParams.get("limit") || "12";

  const currentPage = parseInt(page);
  const articlesPerPage = parseInt(limit);

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

  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-xl px-4 mb-4">
        Articles ({totalArticles})
      </h1>
      <StateHandler state={{ error, loading, length: articles.length }}>
        <StateHandler.Loading>
          <div className="text-center font-bold">Loading...</div>
        </StateHandler.Loading>
        <StateHandler.Error>
          <div className="flex flex-col items-center">
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
          <Articles
            articles={articles}
            setArticles={setArticles}
            totalArticles={totalArticles}
            articlesPerPage={articlesPerPage}
            currentPage={currentPage}
          />
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default MainPage;
