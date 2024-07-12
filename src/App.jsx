import React, { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [displayType, setDisplayType] = useState("html");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/devtool?url=${url}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleButtonClick = (type) => {
    setDisplayType(type);
  };

  const renderData = () => {
    if (loading) {
      return <div className="spinner"></div>;
    }

    if (!data) {
      return <p>No data available. Enter a URL and click Fetch.</p>;
    }

    const displayData = data[displayType];
    if (typeof displayData === "string") {
      return <pre>{displayData}</pre>;
    }

    return (
      <ul>
        {displayData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <h1>Network Tool</h1>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter URL"
      />
      <button onClick={fetchData}>Fetch</button>
      <div className="buttons">
        <button onClick={() => handleButtonClick("html")}>HTML</button>
        <button onClick={() => handleButtonClick("css")}>CSS</button>
        <button onClick={() => handleButtonClick("js")}>JS</button>
        <button onClick={() => handleButtonClick("xhr")}>XHR</button>
        <button onClick={() => handleButtonClick("images")}>Images</button>
        <button onClick={() => handleButtonClick("docs")}>Docs</button>
      </div>
      <div className="data-display">{renderData()}</div>
    </div>
  );
}

export default App;
