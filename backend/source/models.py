from django.db import models


class cryptoData(models.Model):
    symbol = models.CharField(max_length=20)
    price = models.FloatField(default=0)
    SIGNAL_CHOICES = [
        ('BUY', 'BUY'),
        ('SELL', 'SELL'),
        ('HOLD', 'HOLD'),
    ]
    signal = models.CharField(max_length=50, choices=SIGNAL_CHOICES)
    rsi = models.FloatField(null=True, blank=True)
    ma_short = models.FloatField(null=True, blank=True)
    ma_long = models.FloatField(null=True, blank=True)
    macd = models.FloatField(null=True, blank=True)
    decision = models.CharField(max_length=10,blank = True)

    def __str__(self):
        return f"{self.symbol} | {self.signal} | {self.price}"