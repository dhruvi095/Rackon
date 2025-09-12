# shelves/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ShelfInventoryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.shelf_id = self.scope['url_route']['kwargs']['shelf_id']
        self.group_name = f"shelf_{self.shelf_id}"

        # Join group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        # Optionally handle messages from client

        # Broadcast back to group
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'inventory_update',
                'message': data
            }
        )

    # Receive message from group
    async def inventory_update(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))
