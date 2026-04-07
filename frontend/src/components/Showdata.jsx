import { useEffect, useState } from "react";
import "../css/info.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QUOTES = [
    "In crypto, it's not about how much you make — it's about how much you keep.",
    "Risk what you can afford to lose, never what you need to survive.",
    "The time of maximum pessimism is the best time to buy.",
    "Bitcoin is the currency of resistance.",
    "Volatility is the price you pay for outperformance.",
];

const STAT_KEYS = [
    { key: "RSI",        label: "RSI",           mono: true  },
    { key: "MACD",       label: "MACD",          mono: true  },
    { key: "SMA_20",     label: "SMA 20",        mono: true  },
    { key: "EMA_20",     label: "EMA 20",        mono: true  },
    { key: "VOLUME",     label: "Volume",        mono: false },
    { key: "CHANGE_24H", label: "24h Change",    mono: true  },
];

export function Showdata() {
    const navigate  = useNavigate();
    const location  = useLocation();

    const [data,     setData]     = useState(location.state);
    const [oldPrice, setOldPrice] = useState(location.state?.PRICE);
    const [quote,    setQuote]    = useState(QUOTES[0]);
    const [tick,     setTick]     = useState(false);   // flashes price on update

    const symbol = data?.symbol || data?.SYMBOL || "";

    useEffect(() => {
        if (!symbol) return;

        const refreshData = () => {
            axios
                .get(`http://127.0.0.1:8000/crypto/fetch/${symbol}/`)
                .then((resp) => {
                    setOldPrice((prev) => prev ?? resp.data.PRICE);
                    setData(resp.data);
                    setTick((t) => !t);
                })
                .catch(console.error);
        };

        const priceInterval = setInterval(refreshData, 4000);
        const quoteInterval = setInterval(() => {
            setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        }, 6000);

        return () => {
            clearInterval(priceInterval);
            clearInterval(quoteInterval);
        };
    }, [symbol]);

    const priceMove =
        data.PRICE > oldPrice ? "up" :
        data.PRICE < oldPrice ? "down" : "flat";

    const isBuy  = data.decision === "BUY";
    const price  = data.PRICE  ?? data.price  ?? "—";
    const change = data.CHANGE_24H;

    return (
        <div className="info-page">
            <div className="info-glow" />
            <div className="info-grid" />

            <div className="info-container">

                {/* ── Top nav ── */}
                <div className="info-topbar">
                    <button className="nav-btn" onClick={() => navigate("/fetch/")}>
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back
                    </button>
                    <div className="info-live-badge">
                        <span className="live-dot" /> Live
                    </div>
                    <button className="nav-btn" onClick={() => navigate("/")}>
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                            <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                        </svg>
                        Home
                    </button>
                </div>

                {/* ── Hero price card ── */}
                <div className="price-card">
                    <div className="price-card-left">
                        <div className="coin-identity">
                            <div className="coin-avatar">
                                {symbol.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="coin-name">{symbol}</h1>
                                <span className="coin-sub">Cryptocurrency</span>
                            </div>
                        </div>

                        <div className={`price-display ${priceMove}`} key={String(tick)}>
                            <span className="price-currency">₹</span>
                            <span className="price-value">
                                {Number(price).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            {priceMove === "up"   && <span className="price-arrow">▲</span>}
                            {priceMove === "down" && <span className="price-arrow">▼</span>}
                        </div>

                        {change !== undefined && (
                            <div className={`change-badge ${Number(change) >= 0 ? "pos" : "neg"}`}>
                                {Number(change) >= 0 ? "+" : ""}{Number(change).toFixed(2)}% (24h)
                            </div>
                        )}
                    </div>

                    <div className="price-card-right">
                        <div className="signal-panel">
                            <span className="signal-label">AI Signal</span>
                            <div className={`signal-badge ${isBuy ? "buy" : "sell"}`}>
                                <span className="signal-dot" />
                                {data.decision}
                            </div>
                            <p className="signal-desc">
                                {isBuy
                                    ? "Indicators suggest a buying opportunity."
                                    : "Indicators suggest caution — consider selling or holding."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Stats grid ── */}
                <div className="stats-grid">
                    {STAT_KEYS.filter(({ key }) => data[key] !== undefined).map(({ key, label, mono }) => (
                        <div key={key} className="stat-card">
                            <span className="stat-label">{label}</span>
                            <span className={`stat-value ${mono ? "mono" : ""}`}>
                                {typeof data[key] === "number"
                                    ? data[key].toLocaleString("en-IN", { maximumFractionDigits: 4 })
                                    : data[key]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Bottom row ── */}
                <div className="info-bottom">

                    {/* Quote */}
                    <div className="quote-card" key={quote}>
                        <div className="quote-icon">"</div>
                        <p className="quote-text">{quote}</p>
                    </div>

                    {/* Actions */}
                    <div className="action-group">
                        <button
                            className="action-btn primary"
                            onClick={() => navigate("/map", { state: symbol })}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Price History
                        </button>
                        <button
                            className="action-btn ghost"
                            onClick={() => navigate("/fetch/")}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
                                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                            Analyze Another
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}