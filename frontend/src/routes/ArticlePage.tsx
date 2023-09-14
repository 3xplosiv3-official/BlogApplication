import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

  // Handlers
  const handleGoToArticles = () => {
    navigate("/");
  };

  // Article Component (renders only if article is not null to prevent TypeScript errors)
  const Article = ({ article }: { article: IArticle | null }) => {
    if (!article) return null;
    return (
      <>
        <div className="flex flex-col gap-4 p-4 w-full border border-gray-200 rounded-xl">
          <h1 className="font-semibold break-words">{article.title}</h1>
          <div className="flex flex-col h-full justify-between">
            <div className="mb-4 break-words">{article.content}</div>
          </div>
        </div>
        <Comments articleId={id} />
      </>
    );
  };

  // Hooks
  useEffect(() => {
    const getArticle = async () => {
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
    };

    getArticle();
  }, [id]);

  return (
    <div className="flex flex-col h-full px-4">
           {/* Conditional content render */}
    </div>
  );
}

export default ArticlePage;
