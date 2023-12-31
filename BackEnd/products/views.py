from django.shortcuts import get_object_or_404, render
from rest_framework import permissions, viewsets

from products.models import Product, ProductCategory, Review
from products.permissions import CanReviewProduct
from products.serializers import (ProductCategoryReadSerializer,
                                  ProductReadSerializer,
                                  ProductWriteSerializer,
                                  ReviewWriteSerializer,
                                  ReviewReadSerializer)

# Create your views here.


class ProductCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List and Retrieve product categories
    """

    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategoryReadSerializer
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
        if self.action in ("create", "update", "partial_update", "destroy"):
            self.permission_classes = (permissions.IsAdminUser, )
        else:
            self.permission_classes = (permissions.AllowAny, )

        return super().get_permissions()


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return ReviewWriteSerializer

        return ReviewReadSerializer
    
    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            self.permission_classes = (CanReviewProduct, )
        else:
            self.permission_classes = (permissions.AllowAny, )

        return super().get_permissions()