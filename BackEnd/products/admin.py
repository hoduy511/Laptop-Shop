from django.contrib import admin
from import_export.admin import ExportActionMixin

from products.models import Product, ProductCategory, ProductImage


class ProductResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name',)


class ProductCategoryResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name',)


class ProductImageResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(ProductCategory, ProductCategoryResource)
admin.site.register(Product, ProductResource)
admin.site.register(ProductImage, ProductImageResource)
