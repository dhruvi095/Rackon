# shelves/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class InventoryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.shelf_id = self.scope['url_route']['kwargs']['shelf_id']
        self.group_name = f"shelf_{self.shelf_id}"
        
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_inventory_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))
