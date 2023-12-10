from rest_framework import permissions


class CanReviewProduct(permissions.BasePermission):
    message = "You cannot create or edit reviews for this product."

    def has_permission(self, request, view):
        return request.user.is_authenticated is True

    def has_object_permission(self, request, view, obj):
        review = obj
        if review.user == request.user:
            return True

        return False
