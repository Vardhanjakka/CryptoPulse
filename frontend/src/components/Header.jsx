import "../css/header.css"; 


export default function Header() {
    return (
        <header className="header">
            <h1 className="logo">CryptoPulse</h1>

            <div className="ticker">
                <div className="ticker-track">
                    <span className="tick up">BTC ↑ $67,200</span>
                    <span className="tick down">ETH ↓ $3,200</span>
                    <span className="tick up">SOL ↑ $180</span>
                    <span className="tick down">XRP ↓ $0.62</span>
                    <span className="tick up">BTC ↑ $67,200</span>
                    <span className="tick down">ETH ↓ $3,200</span>
                    <span className="tick up">SOL ↑ $180</span>
                    <span className="tick down">XRP ↓ $0.62</span>
                </div>
            </div>
        </header>
    );
}