import {
  useState,
  useCallback,
  useContext,
} from "react";
import { IComment } from "../../ts/interfaces";
import axios from "axios";
import { UserContext } from "../../App";

function Comments({ articleId }: { articleId: string | undefined }) {
  // Context
  const user = useContext(UserContext);

  // States
  const [comments, setComments] = useState<IComment[]>([]);

  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [commentContent, setCommentContent] = useState<string>("");

  // Callback wrapper for getComments
  const getComments = useCallback(async () => {
    try {
      const response = await axios.get<IComment[]>(
        import.meta.env.VITE_BASE_URL + "/comments/article/" + articleId
      );
      setComments(response.data);
    } catch (error) {
      setError(error);
      console.error("Error in getting comments:", error);
    } finally {
      setLoading(false);
    }
  }, [articleId, setComments]);


  // Handlers
  const leaveComment = async () => {
    // Leave comment
  };

  const deleteComment = async (id: number) => {
    // Delete comment
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <span className="font-bold">Comments ({comments.length}):</span>
      <div className="flex items-center w-full bg-gray-50 p-2 gap-2 border rounded-xl sm:h-20 border-gray-100 max-sm:flex-col">
        <textarea
          className="p-4 border border-gray-200 rounded-lg h-full appearance-none resize-none w-full"
          placeholder="Add comment..."
          value={commentContent}
        />
        <button
          className="button-lg flex-shrink-0 bg-accent bg-opacity-10 text-accent
          max-sm:w-full
          disabled:opacity-50"
          disabled={isLeaveCommentDisabled}
          onClick={leaveComment}
        >
          Leave comment
          <span className="ic">east</span>
        </button>
      </div>
      {/* Conditional render */}
    </div>
  );
}

export default Comments;
