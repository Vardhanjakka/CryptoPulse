import "../css/fetch.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const POPULAR_COINS = ["Btc", "Eth", "Sol", "BNB", "XRP", "Doge","TRX"];

export function Fetch() {
  const navigator = useNavigate();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = () => {
    const coin = inputRef.current.value.trim();
    if (!coin) return;

    setError("");
    setLoading(true);

    const url = "http://127.0.0.1:8000/crypto/fetch/" + coin + "/";
    axios
      .get(url)
      .then((resp) => {
        navigator("/info", { state: resp.data });
      })
      .catch((err) => {
        setError("Coin not found. Check the name and try again.");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        inputRef.current.value = "";
      });
  };

  const handleKey = (e) => {
    if (e.key === "Enter") getData();
  };

  const fillCoin = (name) => {
    inputRef.current.value = name;
    inputRef.current.focus();
    setError("");
  };

  return (
    <div className="fetch-page">

      {/* Background effects */}
      <div className="fetch-glow" />
      <div className="fetch-grid" />

      <div className="fetch-container">

        {/* Header */}
        <div className="fetch-header">
          <div className="fetch-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M8.5 11h5M11 8.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="fetch-title">Analyze a Coin</h1>
          <p className="fetch-sub">
            Enter any cryptocurrency name to get live price data,
            technical indicators, and smart buy/sell signals.
          </p>
        </div>

        {/* Search card */}
        <div className="fetch-card">
          <label className="fetch-label">Coin Name or Symbol</label>

          <div className={`search-row ${error ? "has-error" : ""}`}>
            <div className="search-input-wrap">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="e.g. Bitcoin, Ethereum, Solana…"
                onKeyDown={handleKey}
                onChange={() => error && setError("")}
              />
            </div>
            <button
              className={`search-btn ${loading ? "loading" : ""}`}
              onClick={getData}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Fetching…
                </>
              ) : (
                <>
                  Analyze
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="fetch-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Divider */}
          <div className="fetch-divider">
            <span>or try a popular coin</span>
          </div>

          {/* Quick picks */}
          <div className="popular-chips">
            {POPULAR_COINS.map((coin) => (
              <button key={coin} className="chip" onClick={() => fillCoin(coin)}>
                {coin}
              </button>
            ))}
          </div>
        </div>

        {/* Hint */}
        <p className="fetch-hint">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Data is fetched live from binance. Results include RSI, MACD, moving averages &amp; signals.
        </p>

      </div>
    </div>
  );
}