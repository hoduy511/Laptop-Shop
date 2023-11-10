import json

from django.contrib import admin
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.db.models.functions import TruncDay
from import_export.admin import ExportActionMixin

from products.models import Product, ProductCategory, ProductImage


class ProductResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name',)

    # change_list.html
    def changelist_view(self, request, extra_context=None):
        # Aggregate data for created_at
        chart_data_created = (
            Product.objects.annotate(
                date_created=TruncDay("created_at")
            )
            .values("date_created")
            .annotate(y=Count("id"))
            .order_by("-date_created")
        )

        # Aggregate data for updated_at
        chart_data_updated = (
            Product.objects.annotate(
                date_updated=TruncDay("updated_at")
            )
            .values("date_updated")
            .annotate(y=Count("id"))
            .order_by("-date_updated")
        )

        # Serialize and attach the chart data to the template context
        as_json_created = json.dumps(
            list(chart_data_created), cls=DjangoJSONEncoder)
        as_json_updated = json.dumps(
            list(chart_data_updated), cls=DjangoJSONEncoder)

        extra_context = extra_context or {
            "chart_data_created": as_json_created,
            "chart_data_updated": as_json_updated
        }

        return super().changelist_view(request, extra_context=extra_context)

    change_list_template = 'admin/products/product_change_list.html'


class ProductCategoryResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name',)

    # change_list.html
    def changelist_view(self, request, extra_context=None):
        # Aggregate data for created_at
        chart_data_created = (
            ProductCategory.objects.annotate(
                date_created=TruncDay("created_at")
            )
            .values("date_created")
            .annotate(y=Count("id"))
            .order_by("-date_created")
        )

        # Aggregate data for updated_at
        chart_data_updated = (
            ProductCategory.objects.annotate(
                date_updated=TruncDay("updated_at")
            )
            .values("date_updated")
            .annotate(y=Count("id"))
            .order_by("-date_updated")
        )

        # Serialize and attach the chart data to the template context
        as_json_created = json.dumps(
            list(chart_data_created), cls=DjangoJSONEncoder)
        as_json_updated = json.dumps(
            list(chart_data_updated), cls=DjangoJSONEncoder)

        extra_context = extra_context or {
            "chart_data_created": as_json_created,
            "chart_data_updated": as_json_updated
        }

        return super().changelist_view(request, extra_context=extra_context)

    change_list_template = 'admin/products/product_category_change_list.html'


class ProductImageResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('name',)

    # change_list.html
    def changelist_view(self, request, extra_context=None):
        # Aggregate data for created_at
        chart_data_created = (
            ProductCategory.objects.annotate(
                date_created=TruncDay("created_at")
            )
            .values("date_created")
            .annotate(y=Count("id"))
            .order_by("-date_created")
        )

        # Aggregate data for updated_at
        chart_data_updated = (
            ProductCategory.objects.annotate(
                date_updated=TruncDay("updated_at")
            )
            .values("date_updated")
            .annotate(y=Count("id"))
            .order_by("-date_updated")
        )

        # Serialize and attach the chart data to the template context
        as_json_created = json.dumps(
            list(chart_data_created), cls=DjangoJSONEncoder)
        as_json_updated = json.dumps(
            list(chart_data_updated), cls=DjangoJSONEncoder)

        extra_context = extra_context or {
            "chart_data_created": as_json_created,
            "chart_data_updated": as_json_updated
        }

        return super().changelist_view(request, extra_context=extra_context)
    change_list_template = 'admin/products/product_image_change_list.html'


admin.site.register(ProductCategory, ProductCategoryResource)
admin.site.register(Product, ProductResource)
admin.site.register(ProductImage, ProductImageResource)
