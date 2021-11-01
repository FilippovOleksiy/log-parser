import { useEffect, useMemo, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

import { useGlobalContext } from "./hooks/globalContextProvider";
import { fetchUniqWebpages, fetchWebpages } from "./utils/index";
import { tabsList } from "./utils/constants";

import Tabs from "./components/Tabs";
import Table from "./components/Table";

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [webpages, setWebpages] = useState(null);

  const {
    context: { selectedTab },
  } = useGlobalContext();

  const uniqWebpagesMemo = useMemo(
    () => (fileContent && Object.entries(fetchUniqWebpages(fileContent))) || [],
    [fileContent]
  );

  const webpagesMemo = useMemo(
    () =>
      (uniqWebpagesMemo && Object.entries(fetchWebpages(uniqWebpagesMemo))) ||
      [],
    [uniqWebpagesMemo]
  );

  useEffect(() => {
    if (selectedTab === tabsList[0]) {
      setWebpages(webpagesMemo);
    } else {
      setWebpages(uniqWebpagesMemo);
    }
  }, [uniqWebpagesMemo, webpagesMemo, selectedTab]);

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = async (event) => setFileContent(event.target.result);
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="App">
      <div className="App-content-section">
        <div className="Choose-file">
          <input type="file" accept=".log" onChange={onChange} />
        </div>
        {!!webpages?.length && <Tabs />}
        {!!webpages?.length && <Table webpages={webpages} />}
      </div>
      <div>
        <div className="App-logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
