import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  // Navigate Hook
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col flex-1 gap-2 items-center justify-center">
        <h1 className="font-bold text-2xl">404</h1>
        <span>Not found</span>
        <button
          className="button-md"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="ic">west</span>
          Go home
        </button>
      </div>
    </>
  );
}

export default NotFoundPage;
