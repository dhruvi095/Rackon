from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "shelf", "brand", "status", "start_date", "end_date", "created_at")
    list_filter = ("status", "start_date", "end_date", "created_at")
    search_fields = ("shelf__name", "brand__username")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)