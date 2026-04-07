from rest_framework import serializers
from .models import cryptoData

class cryptoserial(serializers.ModelSerializer):
    class meta:
        model = cryptoData
        fields = "__all__"
        
    