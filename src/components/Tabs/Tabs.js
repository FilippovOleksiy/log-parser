import React, { useCallback, useEffect } from "react";

import "./Tabs.css";

import { useGlobalContext } from "../../hooks/globalContextProvider";
import { tabsList } from "../../utils/constants";

function Tabs() {
  const {
    context: { selectedTab },
    setContext,
  } = useGlobalContext();

  const onClick = useCallback(
    (selectedItem) => {
      setContext((cont) => ({ ...cont, selectedTab: selectedItem }));
    },
    [setContext]
  );

  useEffect(() => {
    if (selectedTab === undefined) {
      setContext((cont) => ({ ...cont, selectedTab: tabsList[0] }));
    }
  }, [setContext, selectedTab]);

  return (
    <div className="Tabs">
      {tabsList.map((item) => (
        <div
          key={item}
          className={`Tab-item ${selectedTab === item && "Tab-item--selected"}`}
          onClick={() => {
            onClick(item);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
