function ArticleRow({ article }) {
  // Handlers
  const handleDeleteArticle = async () => {
    //  Delete article
  };

  const handleEditArticle = async () => {
    // Edit article
  };

  return (
    <>
      {/* Modals for edit and delete */}
      <tr>
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
            >
              <span className="ic text-xl">edit</span>
              <span className="sm:hidden font-bold">Edit</span>
            </button>
            <button
              className="flex items-center gap-2 py-2 px-4 rounded-md bg-red-50 text-red-400
              max-sm:py-2 max-sm:px-4"
            >
              <span className="ic text-xl">delete</span>
              <span className="sm:hidden font-bold">Delete</span>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ArticleRow;
