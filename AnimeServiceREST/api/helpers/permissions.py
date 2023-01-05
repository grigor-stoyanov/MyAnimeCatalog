from rest_framework import permissions


class UserUpdatePermission(permissions.BasePermission):
    """
    Permission class to check that a user can update his own resource only
    """

    def has_permission(self, request, view):
        # check that its an update request and user is modifying his resource only
        if view.request.method != 'GET' and view.kwargs['user'] != request.user.__str__():
            return False  # not grant access
        return True  # grant access otherwise
