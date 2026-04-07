from django.urls import path
from.import views
urlpatterns = [
    path("",views.test),
    path("fetch/<str:crypto>/",views.Cryptos.as_view()),
    path("yearly/<str:crypto>/",views.CryptosYearly.as_view()),
]
