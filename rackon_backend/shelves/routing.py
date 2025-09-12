from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/shelves/(?P<shelf_id>\d+)/$', consumers.ShelfInventoryConsumer.as_asgi()),
]
