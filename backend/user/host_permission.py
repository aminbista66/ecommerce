from rest_framework.permissions import BasePermission

class AllowedHostPermission(BasePermission):
    allowed_host = []

    def has_permission(self, request, view):
        return request.get_host() in self.allowed_hosts
