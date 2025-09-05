from notifications.models import Notification
from rest_framework import generics, permissions
from .models import Notification
from rest_framework import status
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')

class NotificationMarkReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Notification.objects.get(pk=pk, recipient=user)
        except Notification.DoesNotExist:
            return None

    # ✅ POST endpoint (no payload needed)
    def post(self, request, pk):
        notif = self.get_object(pk, request.user)
        if not notif:
            return Response({"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)

        notif.is_read = True
        notif.save(update_fields=['is_read'])
        return Response({"detail": "Notification marked as read."}, status=status.HTTP_200_OK)

    # ✅ PATCH endpoint (with payload support)
    def patch(self, request, pk):
        notif = self.get_object(pk, request.user)
        if not notif:
            return Response({"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NotificationSerializer(notif, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UnreadNotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user, is_read=False).order_by('-created_at')
    
class NotificationMarkAllReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        Notification.objects.filter(
            recipient=request.user,
            is_read=False
        ).update(is_read=True)
        return Response({"detail": "All notifications marked as read."})

    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
