from django.contrib import admin
from import_export.admin import ExportActionMixin

from orders.models import Order, OrderItem


class OrderResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('get_buyer_full_name',)
    
    def get_buyer_full_name(self, obj):
        return obj.buyer.get_full_name()

class OrderItemResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('order',)
    
    
admin.site.register(Order, OrderResource)
admin.site.register(OrderItem, OrderItemResource)
