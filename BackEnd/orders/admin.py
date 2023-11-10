import json

from django.contrib import admin
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.db.models.functions import TruncDay
from import_export.admin import ExportActionMixin

from orders.models import Order, OrderItem


class OrderResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('get_buyer_full_name',)

    def get_buyer_full_name(self, obj):
        return obj.buyer.get_full_name()

    # change_list.html
    def changelist_view(self, request, extra_context=None):
        # Aggregate new authors per day for both status choices
        chart_data_pending = (
            Order.objects.filter(status=Order.PENDING)
            .annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )

        chart_data_completed = (
            Order.objects.filter(status=Order.COMPLETED)
            .annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )
        
        as_json_pending = json.dumps(list(chart_data_pending), cls=DjangoJSONEncoder)
        as_json_completed = json.dumps(list(chart_data_completed), cls=DjangoJSONEncoder)
        extra_context = extra_context or {
            "chart_data_pending": as_json_pending,
            "chart_data_completed": as_json_completed,
        }
        
        # Call the superclass changelist_view to render the page
        return super().changelist_view(request, extra_context=extra_context)
    
    change_list_template = 'admin/orders/order_change_list.html'


class OrderItemResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('order',)

    # change_list.html
    def changelist_view(self, request, extra_context=None):
        # Aggregate new authors per day
        chart_data = (
            OrderItem.objects.annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )
        # Serialize and attach the chart data to the template context
        as_json = json.dumps(list(chart_data), cls=DjangoJSONEncoder)
        print("Json %s" % as_json)
        extra_context = extra_context or {"chart_data": as_json}
        # Call the superclass changelist_view to render the page

        return super().changelist_view(request, extra_context=extra_context)
    change_list_template = 'admin/orders/order_item_change_list.html'


admin.site.register(Order, OrderResource)
admin.site.register(OrderItem, OrderItemResource)
