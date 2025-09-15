from django.apps import AppConfig

class ShelvesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shelves'

    def ready(self):
        import shelves.signals  # 👈 ensures signals are registered
