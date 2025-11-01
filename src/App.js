import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function App() {
  const [ids, setIds] = useState([]);

  // LIFECYCLE
  useEffect(() => {
    fetchIds();
  }, []);

  // HANDLE FUNCTIONS
  const fetchIds = async () => {
    const res = await fetch("/data/updateMarketAdvanced.csv");
    const text = await res.text();

    const { data } = Papa.parse(text, { header: true });
    return setIds(data);
  };

  const handleAlbionQuery = async ({ id }) => {
    const apiUrl = `https://europe.albion-online-data.com/api/v2/stats/prices/${id}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  };

  // MAIN RENDER
  return (
    <div>
      {/* HEADER*/}
      <header>HEADER LOCATION</header>
      {/* MAIN DATA*/}
      <main>
        <ul>
          {ids?.map((el, i) => (
            <li onClick={() => handleAlbionQuery({ id: el?.item_id })} key={i}>
              {el?.item_id}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
