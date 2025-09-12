import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BookingsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        # Optionally, send initial message
        await self.send(text_data=json.dumps({"message": "Connected to bookings WS"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Echo message back
        await self.send(text_data=json.dumps({"echo": data}))
