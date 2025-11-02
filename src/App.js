import React, { useEffect, useState } from "react";
import Json from "@microlink/react-json-view";

function App() {
  const [filters, setFilters] = useState([]);
  const [data, setData] = useState([]);
  const [state, setState] = useState({ item_id: "", city: "" });

  // HANDLE FUNCTIONS
  const fetchFilters = async () => {
    const response = await fetch(
      "http://localhost:5000/api/albion/public/item/filters",
    );
    const data = await response.json();
    setFilters(data?.[0]);
  };
  const fetchItems = async ({ city = "", item_id = "" }) => {
    const response = await fetch(
      `http://localhost:5000/api/albion/public/item/list?page=0&limit=100&city=${city}&item_id=${item_id}`,
    );
    const data = await response.json();
    setData(data?.[0]?.items);
  };

  // LIFECYCLE
  useEffect(() => {
    fetchFilters();
  }, []);
  useEffect(() => {
    fetchItems(state);
  }, [state]);

  // HANDLERS
  const onCityChange = (e) =>
    setState((s) => ({ ...s, city: e.target.value || "" }));
  const onItemSelectChange = (e) =>
    setState((s) => ({ ...s, item_id: e.target.value || "" }));
  const onItemInputChange = (e) =>
    setState((s) => ({ ...s, item_id: e.target.value || "" }));
  const resetFilters = () => setState({ item_id: "", city: "" });

  // RENDER FUNCTIONS
  const renderHeaders = () => {
    return (
      <header>
        <h1>Market Albion Data</h1>
        <select
          name="CITY"
          id="CITY"
          value={state.city}
          onChange={onCityChange}
        >
          <option value="">Select CITY</option>
          {filters?.cities?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="ITEM_ID"
          id="ITEM_ID"
          value={state.item_id}
          onChange={onItemSelectChange}
        >
          <option value="">Select ITEM_ID</option>
          {filters?.items?.map((it) => (
            <option key={it} value={it}>
              {it}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Item ID"
          value={state.item_id}
          onChange={onItemInputChange}
        />

        <button type="button" onClick={resetFilters}>
          Reset
        </button>
      </header>
    );
  };

  // MAIN RENDER
  return (
    <div>
      {/* HEADER*/}
      {renderHeaders()}
      {/* MAIN DATA*/}
      <main>
        <table style={{ borderSpacing: "1.5rem" }}>
          <thead>
            <tr style={{ margin: "0 1rem" }}>
              <th>item_id</th>
              <th>city</th>
              <th>quality</th>
              <th>date</th>
              <th>sell_price_min</th>
              <th>sell_price_max</th>
              <th>buy_price_min</th>
              <th>buy_price_max</th>
              <th>difference_pct</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.item_id}</td>
                <td>{item.city}</td>
                <td>{item.quality}</td>
                <td>{item.sell_price_min_date}</td>
                <td>{item.sell_price_min}</td>
                <td>{item.sell_price_max}</td>
                <td>{item.buy_price_min}</td>
                <td>{item.buy_price_max}</td>
                <td>{`${item?.difference_pct}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
