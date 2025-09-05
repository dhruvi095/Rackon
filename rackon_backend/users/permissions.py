from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    """
    Allows access only to users with role = 'owner'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'owner'


class IsBrand(BasePermission):
    """
    Allows access only to users with role = 'brand'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'brand'
