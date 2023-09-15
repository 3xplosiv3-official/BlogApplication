import { useNavigate } from "react-router-dom";

interface IProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
}

function Pagination({ itemsPerPage, totalItems, currentPage }: IProps) {
  // Constants
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const maxPage = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [...Array(maxPage).keys()].map((i) => i + 1);
  const maxButtonsToShow = 10;

  // Truncate pagination buttons if many pages
  let startPage = 1;
  let endPage = maxPage;

  if (maxPage > maxButtonsToShow) {
    const half = Math.floor(maxButtonsToShow / 2);
    startPage = Math.max(currentPage - half, 1);
    endPage = startPage + maxButtonsToShow - 1;

    if (endPage > maxPage) {
      endPage = maxPage;
      startPage = endPage - maxButtonsToShow + 1;
    }
  }

  // Navigate Hook
  const navigate = useNavigate();

  // Pagination functions
  const paginatePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      navigate(`?page=${newPage}`);
    }
  };

  const paginateNext = () => {
    if (currentPage < maxPage) {
      const newPage = currentPage + 1;
      navigate(`?page=${newPage}`);
    }
  };

  const paginateTo = (page: number) => {
    navigate(`?page=${page}`);
  };

  // Button buttons
  const PageButtons = () => {
    return pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
      <button
        key={pageNumber}
        className="inline-flex items-center px-4 text-gray-500 py-2 border border-gray-200 bg-white font-medium disabled:bg-gray-200"
        disabled={pageNumber === currentPage}
        onClick={() => {
          paginateTo(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    ));
  };

  const ToStartButton = () => {
    if (startPage > 1)
      return (
        <button
          className="inline-flex items-center px-4 text-gray-500 py-2 border border-gray-200 bg-white font-medium disabled:bg-gray-200"
          disabled={false}
          onClick={() => {
            paginateTo(1);
          }}
        >
          Start
        </button>
      );
  };

  const ToEndButton = () => {
    if (endPage < maxPage)
      return (
        <button
          className="inline-flex items-center px-4 text-gray-500 py-2 border border-gray-200 bg-white font-medium disabled:bg-gray-200"
          disabled={false}
          onClick={() => {
            paginateTo(maxPage);
          }}
        >
          End
        </button>
      );
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startIndex}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => {
              paginatePrev();
            }}
            className="inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="ic">west</span>
          </button>
          <ToStartButton />
          <PageButtons />
          <ToEndButton />
          <button
            onClick={() => {
              paginateNext();
            }}
            className="inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="ic">east</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
