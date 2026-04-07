import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/map.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export function Map() {
  const location = useLocation();
  const navigate  = useNavigate();
  const crypto    = location.state;

  const [chartData, setChartData] = useState(null);
  const [stats,     setStats]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");

  useEffect(() => {
    if (!crypto) return;

    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const res     = await axios.get(`http://127.0.0.1:8000/crypto/yearly/${crypto}/`);
        const records = res.data; // [{ date, price }, ...]

        const labels = records.map((r) => r.date);
        const prices = records.map((r) => r.price);

        // Compute simple stats
        const min    = Math.min(...prices);
        const max    = Math.max(...prices);
        const first  = prices[0];
        const last   = prices[prices.length - 1];
        const change = (((last - first) / first) * 100).toFixed(2);

        setStats({ min, max, first, last, change });

        setChartData({
          labels,
          datasets: [
            {
              label: `${crypto} / USDT`,
              data: prices,
              borderColor: "#00e5a0",
              backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0,   "rgba(0,229,160,0.18)");
                gradient.addColorStop(0.6, "rgba(0,229,160,0.04)");
                gradient.addColorStop(1,   "rgba(0,229,160,0)");
                return gradient;
              },
              borderWidth: 2,
              tension: 0.35,
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#00e5a0",
              pointHoverBorderColor: "#080c12",
              pointHoverBorderWidth: 2,
              fill: true,
            },
          ],
        });
      } catch (err) {
        setError("Failed to load chart data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [crypto]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111a26",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        titleColor: "#8494a8",
        bodyColor: "#eef2f8",
        padding: 12,
        titleFont: { family: "'DM Mono', monospace", size: 11 },
        bodyFont: { family: "'DM Mono', monospace", size: 13, weight: "500" },
        callbacks: {
          title: (items) => items[0].label,
          label: (item) =>
            ` $${Number(item.raw).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4a5a6e",
          font: { family: "'DM Mono', monospace", size: 10 },
          maxTicksLimit: 8,
          maxRotation: 0,
        },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { color: "rgba(255,255,255,0.07)" },
      },
      y: {
        position: "right",
        ticks: {
          color: "#4a5a6e",
          font: { family: "'DM Mono', monospace", size: 10 },
          callback: (v) =>
            "$" + Number(v).toLocaleString("en-US", { maximumFractionDigits: 0 }),
        },
        grid: { color: "rgba(255,255,255,0.04)" },
        border: { color: "rgba(255,255,255,0.07)" },
      },
    },
  };

  const isPositive = stats && Number(stats.change) >= 0;

  return (
    <div className="map-page">
      <div className="map-glow" />
      <div className="map-grid" />

      <div className="map-container">

        {/* Top bar */}
        <div className="map-topbar">
          <button className="nav-btn" onClick={() => navigate(-1)}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <div className="map-badge">
            <span className="map-badge-dot" />
            365-Day History
          </div>
          <button className="nav-btn" onClick={() => navigate("/")}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            Home
          </button>
        </div>

        {/* Coin header */}
        <div className="map-header">
          <div className="map-coin-avatar">
            {crypto ? crypto.slice(0, 2).toUpperCase() : "??"}
          </div>
          <div>
            <h1 className="map-title">{crypto} <span className="map-pair">/ USDT</span></h1>
            <p className="map-sub">Daily closing price · Last 365 days</p>
          </div>
          {stats && (
            <div className={`map-change-badge ${isPositive ? "pos" : "neg"}`}>
              {isPositive ? "▲" : "▼"} {Math.abs(stats.change)}% YTD
            </div>
          )}
        </div>

        {/* Stats row */}
        {stats && (
          <div className="map-stats">
            {[
              { label: "Current Price", value: `$${Number(stats.last).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
              { label: "1Y High",       value: `$${Number(stats.max).toLocaleString("en-US",  { minimumFractionDigits: 2 })}` },
              { label: "1Y Low",        value: `$${Number(stats.min).toLocaleString("en-US",  { minimumFractionDigits: 2 })}` },
              { label: "1Y Change",     value: `${isPositive ? "+" : ""}${stats.change}%`, colored: true, positive: isPositive },
            ].map(({ label, value, colored, positive }) => (
              <div key={label} className="map-stat">
                <span className="map-stat-label">{label}</span>
                <span className={`map-stat-value ${colored ? (positive ? "pos" : "neg") : ""}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Chart card */}
        <div className="map-card">
          {loading && (
            <div className="map-loading">
              <span className="map-spinner" />
              <span>Loading chart data…</span>
            </div>
          )}
          {error && !loading && (
            <div className="map-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}
          {chartData && !loading && (
            <div className="chart-wrapper">
              <Line data={chartData} options={options} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}