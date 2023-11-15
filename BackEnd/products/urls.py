from django.urls import include, path
from rest_framework.routers import DefaultRouter

from products.views import (ProductCategoryViewSet, ProductViewSet,
                            ReviewViewSet)

app_name = "products"

router = DefaultRouter()
router.register(r"categories", ProductCategoryViewSet, basename="categories")
router.register(r"reviews", ReviewViewSet, basename="reviews")
router.register(r"", ProductViewSet, basename="products")

urlpatterns = [
    path("", include(router.urls)),
]
