from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, viewsets

from products.models import Product, Category
from products.permissions import IsSellerOrAdmin
from products.serializers import (
    CategoryReadSerializer,
    ProductReadSerializer,
    ProductWriteSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and Retrieve product categories
    """

    queryset = Category.objects.all()
    serializer_class = CategoryReadSerializer
    permission_classes = (permissions.AllowAny,)


class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD products
    """

    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return ProductWriteSerializer

        return ProductReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsSellerOrAdmin,)
        else:
            self.permission_classes = (permissions.AllowAny,)

        return super().get_permissions()