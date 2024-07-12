import { useState } from "react";
import axios from "axios";
import "./app.css";

function MainComponent() {
  const [info, setInfo] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const [viewType, setViewType] = useState("html");
  const [isLoading, setIsLoading] = useState(false);

  const retrieveData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://devtool-backend.onrender.com/devtool?url=${inputUrl}`
      );
      setInfo(res.data);
    } catch (err) {
      console.error("Error retrieving data", err);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleButtonPress = (type) => {
    setViewType(type);
  };

  const displayInfo = () => {
    if (isLoading) {
      return <div className="spinner"></div>;
    }

    if (!info) {
      return <p>No data found. Enter a url to get data</p>;
    }

    const displayedInfo = info[viewType];
    if (typeof displayedInfo === "string") {
      return <pre>{displayedInfo}</pre>;
    }

    return (
      <ul>
        {displayedInfo.map((elem, idx) => (
          <li key={idx}>{elem}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <h1>Network Utility</h1>
      <input
        type="text"
        value={inputUrl}
        onChange={handleInputChange}
        placeholder="Enter URL"
      />
      <button onClick={retrieveData}>Fetch</button>
      <div className="buttons">
        <button onClick={() => handleButtonPress("html")}>HTML</button>
        <button onClick={() => handleButtonPress("css")}>CSS</button>
        <button onClick={() => handleButtonPress("js")}>JS</button>
        <button onClick={() => handleButtonPress("images")}>Images</button>
        <button onClick={() => handleButtonPress("xhr")}>XHR</button>
        <button onClick={() => handleButtonPress("docs")}>Docs</button>
      </div>
      <div className="data-display">{displayInfo()}</div>
    </div>
  );
}

export default MainComponent;
