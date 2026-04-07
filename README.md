🚀 CryptoPulse
Track Crypto. Decide Smarter.
CryptoPulse is a full-stack crypto analytics platform that provides real-time market insights, technical indicators, and AI-driven decision support to help traders make informed decisions.

📌 Overview
CryptoPulse combines live cryptocurrency data with technical analysis and backend intelligence to deliver actionable BUY / SELL signals. It is designed for modern traders who want clarity in volatile markets.

✨ Features
* 📊 Real-Time Market Data Fetches live cryptocurrency prices and trends
* 📈 Technical Analysis Engine Includes indicators like:
   * Moving Averages (Short & Long)
   * MACD
   * Trend Signals
* 🤖 Smart Decision System Backend logic generates:
   * BUY / SELL recommendations
* 🔐 User Authentication Secure login system with backend validation
* ⚡ Responsive UI Clean and modern React interface optimized for performance
🛠️ Tech Stack
Frontend
* React.js
* CSS (Custom UI Design)
* Axios
Backend
* Django
* Django REST Framework
Database
* MySQL

🧠 How It Works
1. User selects a cryptocurrency
2. Frontend sends request to backend API
3. Backend:
   * Fetches or processes market data
   * Applies technical indicators
   * Generates decision (BUY / SELL)
4. Response is displayed in UI with insights


⚙️ Installation
1. Clone Repository

```
git clone https://github.com/your-username/cryptopulse.git
cd cryptopulse
```

2. Backend Setup

```
cd backend
pip install -r requirements.txt
python manage.py runserver
```

3. Frontend Setup

```
cd frontend
npm install
npm start
```

🔌 API Example

```
crypto/fetch/<str:cypto>/

Response:
{
  "decision": "BUY",
  "ma_short": 0.45,
  "ma_long": 0.32,
  "macd": 0.21
}
```
🚧 Future Improvements
*  📊 Advanced charting (TradingView integration) 
*  🧠 AI/ML-based prediction models 
*  🔔 Price alerts & notifications 
*  🌍 Multi-crypto portfolio tracking 
🤝 Contributing
Contributions are welcome!  Feel free to fork this repo and submit a pull request.

📜 License
This project is licensed under the MIT License.


👨‍💻 Author
Vardhan Jakka
*  Full Stack Developer 
*  Passionate about Trading & Data Systems.
