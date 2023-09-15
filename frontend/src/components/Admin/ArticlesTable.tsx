import { Dispatch, SetStateAction } from "react";
import { IArticle } from "../../ts/interfaces";

interface IProps {
  articles: IArticle[];
  setArticle: (article: IArticle) => void;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}

function ArticlesTable({
  articles,
  setArticle,
  setShowEditModal,
  setShowDeleteModal,
}: IProps) {
  // Mapped articles component
  const ArticlesMap = () =>
    articles.map((article) => (
      <tr key={article.id}>
        <td className="w-[0%] text-xs text-gray-700">
          <span className="sm:block">{new Date().toLocaleDateString()}</span>
          <span className="sm:block">{new Date().toLocaleTimeString()}</span>
        </td>
        <td className="w-[0%] text-xs text-gray-700">
          <span className="sm:block">{new Date().toLocaleDateString()}</span>
          <span className="sm:block">{new Date().toLocaleTimeString()}</span>
        </td>
        <td className="max-w-[150px] truncate">
          <span className="truncate">{article.title}</span>
        </td>
        <td className="max-w-[150px] truncate">
          <span className="truncate">{article.content}</span>
        </td>
        <td className="w-[0%]">
          <div className="flex gap-2 justify-end w-full">
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50
            max-sm:py-2 max-sm:px-4"
              onClick={() => {
                setShowEditModal(true);
                setArticle(article);
              }}
            >
              <span className="ic text-xl">edit</span>
              <span className="sm:hidden font-bold">Edit</span>
            </button>
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-red-50 text-red-400
            max-sm:py-2 max-sm:px-4"
              onClick={() => {
                setShowDeleteModal(true);
                setArticle(article);
              }}
            >
              <span className="ic text-xl">delete</span>
              <span className="sm:hidden font-bold">Delete</span>
            </button>
          </div>
        </td>
      </tr>
    ));

  return (
    <>
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
          <ArticlesMap />
        </tbody>
      </table>
    </>
  );
}
export default ArticlesTable;
