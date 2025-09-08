# ---------- Shelf availability updater ----------
def update_shelf_availability(shelf):
    has_active_bookings = shelf.bookings.filter(status__in=['pending', 'accepted']).exists()
    shelf.currently_available = not has_active_bookings
    shelf.save(update_fields=['currently_available'])

