import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from notifications.routing import websocket_urlpatterns

import sys
sys.path.append(r'C:\Users\DELL\Rackon\rackon_backend\venv\Lib\site-packages')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rackon.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
