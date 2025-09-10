# shelves/routing.py
from django.urls import re_path
from .consumers import InventoryConsumer

websocket_urlpatterns = [
    re_path(r'ws/shelves/(?P<shelf_id>\d+)/$', InventoryConsumer.as_asgi()),
]
