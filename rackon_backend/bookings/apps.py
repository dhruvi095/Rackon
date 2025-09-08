from django.apps import AppConfig


class BookingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bookings'
<<<<<<< HEAD
=======
    def ready(self):
        import bookings.signals
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
