import requests
import pandas as pd
import requests
from rest_framework.response import Response

def Getdata(symbol):
    url = f"https://api.binance.com/api/v3/klines?symbol={symbol}&interval=1m&limit=100"

    response = requests.get(url)
    data = response.json()

    df = pd.DataFrame(data, columns=[
        "open_time","open","high","low","close","volume",
        "close_time","qav","trades","tbbav","tbqav","ignore"
    ])

    df["open_time"] = pd.to_datetime(df["open_time"], unit="ms")

    for col in ["open", "high", "low", "close", "volume"]:
        df[col] = df[col].astype(float)

    return df

def Getdata_yearly(symbol):
    url = (
        f"https://api.binance.com/api/v3/klines"
        f"?symbol={symbol}&interval=1d&limit=365"
    )
    data = requests.get(url).json()

    df = pd.DataFrame(data, columns=[
        "open_time","open","high","low","close","volume",
        "close_time","qav","trades","tbbav","tbqav","ignore"
    ])

    df["date"]  = pd.to_datetime(df["open_time"], unit="ms").dt.strftime("%Y-%m-%d")
    df["price"] = df["close"].astype(float)

    return df[["date", "price"]]


def get_price(symbol):
    url = f"https://api.binance.com/api/v3/ticker/price?symbol={symbol}"
    
    response = requests.get(url).json()
    
    print("BINANCE RESPONSE:", response) 
    
    if "price" not in response:
        return None

    return float(response["price"])