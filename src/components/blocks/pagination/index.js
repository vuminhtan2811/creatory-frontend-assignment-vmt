import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
import "./index.css";

export const PaginationLimits = [10, 15, 20, 25, 50, 100];

function Pagination(props) {
  const curPage = props.pagination?.page || 1;
  const [pageInput, setPageInput] = useState(curPage);
  const { totalPages, page } = props.pagination;
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  useEffect(() => {
    setPageInput(curPage);
  }, [curPage]);

  const handleSelectLimit = (e) => {
    e.preventDefault();
    props.onSearchChanged({
      limit: e.target.value,
    });
  };

  const onPageChanged = (page) => {
    props.onSearchChanged({
      page,
    });
  };

  return (
    <div className="pagination">
      <div className="pg-left">
        <nav className="pagination">
          <div className="control">
            <select value={props.limit} onChange={handleSelectLimit}>
              <option value={PaginationLimits[0]}>--Pagination--</option>
              {PaginationLimits.map((limit) => (
                <option key={limit} value={limit}>
                  {limit} records
                </option>
              ))}
            </select>
          </div>
          <ul className="pagination-list">
            <button
              className="pagination-previous"
              onClick={() => onPageChanged(curPage - 1)}
              disabled={!hasPrevPage}
            >
              Previous
            </button>
            {curPage > 2 ? (
              <li>
                <button
                  className="pagination-link"
                  onClick={() => onPageChanged(1)}
                >
                  {1}
                </button>
              </li>
            ) : (
              <></>
            )}
            {curPage > 3 ? (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            ) : (
              <></>
            )}
            {hasPrevPage ? (
              <button
                className="pagination-link"
                onClick={() => onPageChanged(page - 1)}
              >
                {page - 1}
              </button>
            ) : (
              <></>
            )}
            <li>
              <button
                className="pagination-link is-current"
                onClick={() => onPageChanged(curPage)}
              >
                {curPage}
              </button>
            </li>
            {hasNextPage ? (
              <button
                className="pagination-link"
                onClick={() => onPageChanged(page + 1)}
              >
                {page + 1}
              </button>
            ) : (
              <></>
            )}
            {curPage < totalPages - 2 ? (
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            ) : (
              <></>
            )}
            {curPage < totalPages - 1 ? (
              <li>
                <button
                  className="pagination-link"
                  onClick={() => onPageChanged(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            ) : (
              <></>
            )}
            <button
              className="pagination-next"
              onClick={() => onPageChanged(curPage + 1)}
              disabled={!hasNextPage}
            >
              Next page
            </button>
          </ul>
        </nav>
      </div>
      <div className="pg-right">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onPageChanged(pageInput);
          }}
        >
          <div className="field has-addons">
            <div className="control">
              <input
                type="number"
                placeholder="Jump to page..."
                className="input is-small"
                value={pageInput}
                onChange={(event) => setPageInput(Number(event.target.value))}
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-small">
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  onSearchChanged: Proptypes.func.isRequired,
  pagination: Proptypes.func.isRequired,
  limit: Proptypes.number.isRequired,
};

export default Pagination;
