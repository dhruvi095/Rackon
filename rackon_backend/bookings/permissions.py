from rest_framework.permissions import BasePermission

class IsRetailerShelfOwner(BasePermission):
    """
    Allows access only to retailers who own the shelf of the booking.
    """

    def has_object_permission(self, request, view, obj):
        print("🔎 DEBUG Booking:", obj.id, "Shelf owner:", getattr(obj.shelf, "owner", None), "Request user:", request.user)
        return getattr(obj.shelf, "owner", None) == request.user 


class IsBookingOwnerOrReadOnly(BasePermission):
    """
    Brands can only delete their own bookings.
    Anyone related (brand or shelf owner) can view.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE methods (GET, HEAD, OPTIONS) are always allowed
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True

        # Only the brand who created the booking can delete it
        if request.method == 'DELETE':
            return obj.brand == request.user

        return False
