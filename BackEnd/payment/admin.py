from django.contrib import admin
from import_export.admin import ExportActionMixin

from payment.models import Payment


class PaymentResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('get_buyer_full_name',)

    def get_buyer_full_name(self, obj):
        return obj.order.buyer.get_full_name()


admin.site.register(Payment, PaymentResource)
