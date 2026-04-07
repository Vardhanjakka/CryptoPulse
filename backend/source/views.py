from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .Getdata import Getdata,get_price
from .Decision import get_decision
from .models import cryptoData
from rest_framework.response import Response
from .Getdata import Getdata_yearly


def test(request):
    return HttpResponse("this is test page")

#Mian Logic Here:

class Cryptos(APIView):
    def get(self,request,crypto):
        crypto = crypto.strip().upper()
        if not crypto.endswith("USDT"):
            crypto+="USDT"
        dataframe = Getdata(crypto)
        if isinstance(dataframe, dict) and "code" in dataframe:
            return Response({
                "error": "Invalid symbol or API issue-->Error in API",
                "details": dataframe
    }, status=400)
        price = get_price(crypto)
        if price is None:
            return Response({
                "error": "Invalid-->Error in Price"
    }, status=400)
        decision, rsi, ma_short, ma_long, macd, signal = get_decision(dataframe)
        
        cryptoData.objects.create(
        symbol=crypto,
        price=price,
        rsi=rsi,
        ma_short=ma_short,
        ma_long=ma_long,
        macd=macd,
        signal=signal,
        decision=decision,
    )
        return Response({
        "symbol": crypto,
        "price": price,
        "rsi": round(rsi, 2),
        "ma_short": round(ma_short, 2),
        "ma_long": round(ma_long, 2),
        "macd": round(macd, 2),
        "signal": round(signal, 2),
        "decision": decision,
    })


class CryptosYearly(APIView):
    def get(self, request, crypto):
        crypto = crypto.strip().upper()
        if not crypto.endswith("USDT"):
            crypto += "USDT"
        dataframe = Getdata_yearly(crypto)
        return Response(dataframe.to_dict(orient="records"))