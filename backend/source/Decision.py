from .Analysis import calculate_rsi, moving_average, calculate_macd

def get_decision(df):
    rsi = calculate_rsi(df)
    ma_short = moving_average(df, 10)
    ma_long = moving_average(df, 50)
    macd, signal = calculate_macd(df)
    score = 0
    if rsi < 30:
        score += 1
    elif rsi > 70:
        score -= 1

    if ma_short > ma_long:
        score += 1
    else:
        score -= 1

    if macd > signal:
        score += 1
    else:
        score -= 1
        
    if score > 0:
        decision = "BUY"
    else:
        decision = "SELL"

    return decision, rsi, ma_short, ma_long, macd, signal