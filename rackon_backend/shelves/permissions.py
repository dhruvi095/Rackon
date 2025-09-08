from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsShelfOwnerOrReadOnly(BasePermission):
    """
    Only shelf owners can update/delete.
    Others can only view (GET, HEAD, OPTIONS).
    """
    def has_object_permission(self, request, view, obj):
        # Read-only requests → always allowed
        if request.method in SAFE_METHODS:
            return True
        # Otherwise → only owner can edit/delete
        return obj.owner == request.user
