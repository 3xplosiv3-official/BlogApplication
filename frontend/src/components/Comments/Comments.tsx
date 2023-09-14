import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useContext,
} from "react";
import { IComment, IToast } from "../../ts/interfaces";
import axios, { AxiosError } from "axios";
import StateHandler from "../StateHandler/StateHandler";
import Comment from "./Comment";
import { UserContext } from "../../App";
import Toaster from "../StateHandler/Toaster";

function Comments({ articleId }: { articleId: string | undefined }) {
  // Context
  const user = useContext(UserContext);

  // States
  const [comments, setComments] = useState<IComment[]>([]);

  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [commentContent, setCommentContent] = useState<string>("");
  const [isLeaveCommentDisabled, setIsLeaveCommentDisabled] =
    useState<boolean>(true);

  const [messages, setMessages] = useState<IToast[]>([]);

  // Add Toaster message
  const addMessage = (message: string | number, type: number = 1) => {
    setMessages([...messages, { message, type }]);
  };

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

  // Hooks
  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    if (!commentContent) {
      setIsLeaveCommentDisabled(true);
    } else {
      setIsLeaveCommentDisabled(false);
    }
  }, [commentContent, setIsLeaveCommentDisabled]);

  const handleCommentContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  // Handlers
  const leaveComment = async () => {
    try {
      setIsLeaveCommentDisabled(true);
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/comments",
        {
          content: commentContent,
          article_id: articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCommentContent("");
      getComments();
      addMessage("Successfully commented", 1);
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
      console.error("Error in getting comments:", error);
    } finally {
      setIsLeaveCommentDisabled(false);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "/comments/" + id, {
        headers: {
          Authorization: "Bearer " + user?.token,
          "Content-Type": "application/json",
        },
      });
      setComments(comments.filter((x) => x.id !== id));
      addMessage("Successfully deleted comment", 1);
      return true;
    } catch (error) {
      const err = error as AxiosError;
      addMessage(err.message, -1);
      console.error("Error in deleting article:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <Toaster messages={messages} setMessages={setMessages} />
      <span className="font-bold">Comments ({comments.length}):</span>
      <div className="flex items-center w-full bg-gray-50 p-2 gap-2 border rounded-xl sm:h-20 border-gray-100 max-sm:flex-col">
        <textarea
          className="p-4 border border-gray-200 rounded-lg h-full appearance-none resize-none w-full"
          placeholder="Add comment..."
          value={commentContent}
          onChange={handleCommentContentChange}
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
      <StateHandler state={{ error, loading, length: comments.length }}>
        <StateHandler.Loading>
          <div className="text-center font-bold p-4">Loading...</div>;
        </StateHandler.Loading>
        <StateHandler.Error>
          <h1 className="font-bold mb-4">Error in getting comments!</h1>
          <div>
            <button
              className="button-md bg-gray-50 border border-gray-100"
              onClick={getComments}
            >
              <span className="ic">refresh</span>
              Refresh comments
            </button>
          </div>
        </StateHandler.Error>
        <StateHandler.Empty>
          <div className="font-bold mb-4 ml-4">
            No comments... Be the first!
          </div>
        </StateHandler.Empty>
        <StateHandler.Success>
          <div className="flex flex-col px-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onDeleteComment={deleteComment}
              />
            ))}
          </div>
        </StateHandler.Success>
      </StateHandler>
    </div>
  );
}

export default Comments;
