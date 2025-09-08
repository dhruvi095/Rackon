from django.contrib import admin
from .models import Shelf

@admin.register(Shelf)
class ShelfAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location", "size", "visibility", "rent", "currently_available", "owner", "created_at")
    list_filter = ("location", "size", "visibility", "is_active", "currently_available")
    search_fields = ("name", "location", "owner__username")
    ordering = ("-created_at",)
    readonly_fields = ("created_at", "updated_at")