import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StockPrice() {
  const [n, setN] = useState(0); // State to hold the input value
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  const fetchStocksFromBackend = async () => {
    try {
      const response = await axios.get(`https://weak-gray-mite-robe.cyclic.app/stocks/${n}`); // Replace with your backend URL
      setStocks(response.data.stocks);
      setError(null);
    } catch (error) {
      setError('Error fetching stocks from the backend');
    }
  };

  useEffect(() => {
    if (n > 0) {
      fetchStocksFromBackend();
    }
  }, [n]);


  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Stock Prices</h1>
      <div className="mb-3">
        <label htmlFor="quantityInput" className="form-label">
          Enter a number (not more than 20):
        </label>
        <input
          id="quantityInput"
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="form-control"
          min="1"
          max="20"
        />
      </div>
      <button onClick={fetchStocksFromBackend} className="btn btn-primary mb-3">
        Update Stocks Prices
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker}>
                <td>{stock.ticker}</td>
                <td>{stock.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default StockPrice;