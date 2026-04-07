import "../css/home.css";
import { useNavigate } from "react-router-dom";

const TICKER_ITEMS = [
  { symbol: "BTC", price: "67,412.80", change: "+2.34%" },
  { symbol: "ETH", price: "3,521.44", change: "+1.87%" },
  { symbol: "SOL", price: "182.90", change: "+5.12%" },
  { symbol: "BNB", price: "594.21", change: "-0.63%" },
  { symbol: "XRP", price: "0.5841", change: "+3.01%" },
  { symbol: "ADA", price: "0.4512", change: "-1.22%" },
  { symbol: "DOGE", price: "0.1723", change: "+4.88%" },
  { symbol: "AVAX", price: "38.91", change: "+2.10%" },
];

const STATS = [
  { label: "24h Volume", value: "$142.8B" },
  { label: "Market Cap", value: "$2.41T" },
  { label: "BTC Dominance", value: "52.3%" },
  { label: "Active Coins", value: "10,240+" },
];

const FEATURES = [
  {
    icon: "📊",
    tag: "Real-Time",
    title: "Live Market Feed",
    desc: "Track thousands of crypto assets with millisecond price updates, live order books, and volume heatmaps.",
  },
  {
    icon: "📈",
    tag: "AI-Powered",
    title: "Smart Analysis",
    desc: "RSI, MACD, Bollinger Bands and moving averages processed by our backend for instant, actionable signals.",
  },
  {
    icon: "⚡",
    tag: "Instant",
    title: "Buy / Sell Signals",
    desc: "Backend-driven decision engine delivers clear buy, hold, and sell signals with confidence scoring.",
  },
];

const HOW_STEPS = [
  { num: "01", title: "Pick a Coin", desc: "Search any asset from our live index of 10,000+ cryptocurrencies." },
  { num: "02", title: "Run Analysis", desc: "Our engine processes on-chain data, technicals, and market sentiment." },
  { num: "03", title: "Act with Confidence", desc: "Get a clear signal and supporting rationale — no guesswork." },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ── TICKER BAR ── */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">${item.price}</span>
              <span className={`ticker-change ${item.change.startsWith("+") ? "up" : "down"}`}>
                {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-badge">
          <span className="live-dot" /> Live Market Intelligence
        </div>
        <h1 className="hero-title">
          Track Crypto.<br />
          <span className="accent">Decide Smarter.</span>
        </h1>
        <p className="hero-sub">
          Real-time market insights, technical analysis, and smart decision
          support for modern traders — all in one place.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/fetch/")}>
            Analyze a Coin
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Stat strip */}
        <div className="hero-stats">
          {STATS.map((s, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-value">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Background gfx */}
        <div className="hero-glow" />
        <div className="hero-grid" />
      </section>

      {/* ── FEATURES ── */}
      <section className="section features-section">
        <div className="section-header">
          <span className="section-tag">Why CryptoTrack</span>
          <h2>Everything you need to trade smarter</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-top">
                <div className="feature-icon">{f.icon}</div>
                <span className="feature-tag">{f.tag}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-bar" />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how-section">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>Three steps to your next trade</h2>
        </div>
        <div className="how-grid">
          {HOW_STEPS.map((s, i) => (
            <div key={i} className="how-card">
              <span className="how-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to trade with an edge?</h2>
          <p>Join thousands of traders using real-time signals every day.</p>
          <button className="btn-primary" onClick={() => navigate("/fetch/")}>
            Start Analyzing
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="cta-glow" />
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-brand">CryptoTrack</span>
        <span className="footer-copy">© {new Date().getFullYear()} · For informational purposes only. Not financial advice.</span>
      </footer>

    </div>
  );
}