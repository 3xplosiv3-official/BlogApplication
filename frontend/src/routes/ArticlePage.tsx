import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IArticle } from "../ts/interfaces";
import Comments from "../components/Comments/Comments";
import axios from "axios";
import StateHandler from "../components/StateHandler/StateHandler";

function ArticlePage() {
  // Get ID from URL
  const { id } = useParams();

  // Navigate Hook
  const navigate = useNavigate();

  // States
  const [article, setArticle] = useState<IArticle | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  // Get articles
  const getArticle = useCallback(async () => {
    try {
      const response = await axios.get<IArticle>(
        import.meta.env.VITE_BASE_URL + "/articles/" + id
      );
      setArticle(response.data);
    } catch (error) {
      setError(error);
      console.error("Error in getting article:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Hooks
  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return (
    <div className="flex flex-col h-full px-4">
      <StateHandler state={{ error, loading }}>
        <StateHandler.Loading>
          <div className="text-center font-bold">Loading...</div>
        </StateHandler.Loading>
        <StateHandler.Error>
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-4">Error in getting article!</h1>
            <button
              className="button-md bg-gray-50 border border-gray-100"
              onClick={() => navigate(-1)}
            >
              <span className="ic">west</span>
              Go back to articles
            </button>
          </div>
        </StateHandler.Error>
        <StateHandler.Empty>
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-4">Empty...</h1>
          </div>
        </StateHandler.Empty>
        <StateHandler.Success>
          <div className="flex flex-col gap-4 p-4 w-full border border-gray-200 rounded-xl">
            <h1 className="font-semibold break-words">{article?.title}</h1>
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4 break-words">{article?.content}</div>
            </div>
          </div>
          <Comments articleId={id} />
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default ArticlePage;
