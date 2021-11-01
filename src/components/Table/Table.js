import React, { useCallback, useEffect, useMemo, useState } from "react";

import "./Table.css";

import { sortByPageName, sortByViews } from "../../utils/index";
import {
  viewsSortIndicators,
  pageNameSortIndicators,
} from "../../utils/constants";

function Table({ webpages }) {
  const [viewsSortDirections, setViewsSortDirections] = useState(null);
  const [pageNameSortDirections, setPageNameSortDirections] = useState(
    pageNameSortIndicators
  );
  const [sortedList, setSortedList] = useState([]);

  const sortedWebpages = useMemo(() => {
    if (pageNameSortDirections) {
      return sortByPageName(webpages);
    } else {
      return sortByViews(webpages);
    }
  }, [webpages, pageNameSortDirections]);

  const sortClickHandler = useCallback(
    (sortDirection) => {
      if (sortDirection === null) {
        if (sortDirection === pageNameSortDirections) {
          setViewsSortDirections(null);
          setPageNameSortDirections(pageNameSortIndicators);
        } else {
          setViewsSortDirections(viewsSortIndicators);
          setPageNameSortDirections(null);
        }
        setSortedList(sortedWebpages);
      } else {
        if (sortDirection === pageNameSortDirections) {
          setPageNameSortDirections((value) => value.slice().reverse());
        } else {
          setViewsSortDirections((value) => value.slice().reverse());
        }

        setSortedList((list) => list.slice().reverse());
      }
    },
    [pageNameSortDirections, sortedWebpages]
  );

  useEffect(() => {
    setSortedList(sortedWebpages);
    setViewsSortDirections(null);
    setPageNameSortDirections(pageNameSortIndicators);
  }, [webpages, sortedWebpages]);

  return (
    <div className="Table">
      <div className="Table-header">
        <div
          className={`Sort ${pageNameSortDirections && "Sort--selected"}`}
          onClick={() => sortClickHandler(pageNameSortDirections)}
        >
          Webpage name
          {pageNameSortDirections && (
            <span className="Sort-direction">
              ({pageNameSortDirections[0]})
            </span>
          )}
        </div>
        <div
          className={`Sort ${viewsSortDirections && "Sort--selected"}`}
          onClick={() => sortClickHandler(viewsSortDirections)}
        >
          Views
          {viewsSortDirections && (
            <span className="Sort-direction">({viewsSortDirections[0]})</span>
          )}
        </div>
      </div>

      <div className="Table-body">
        {sortedList.map(([key, value]) => (
          <div key={key} className={"Table-row"}>
            <div>{key}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
