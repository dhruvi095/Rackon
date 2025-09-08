from django.core.management.base import BaseCommand
from django.utils.timezone import now
from bookings.models import Booking


class Command(BaseCommand):
    help = "Mark past bookings as expired if end_date < today and status is pending/accepted"

    def handle(self, *args, **kwargs):
        today = now().date()
        expired = Booking.objects.filter(
            end_date__lt=today,
            status__in=['pending', 'accepted']
        )
        count = expired.update(status='expired')

        self.stdout.write(self.style.SUCCESS(f"✅ {count} bookings marked as expired"))
