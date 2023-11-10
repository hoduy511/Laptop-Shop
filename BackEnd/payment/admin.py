import json

from django.contrib import admin
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count
from django.db.models.functions import TruncDay
from import_export.admin import ExportActionMixin

from payment.models import Payment


class PaymentResource(ExportActionMixin, admin.ModelAdmin):
    list_display = ('get_buyer_full_name',)

    def get_buyer_full_name(self, obj):
        return obj.order.buyer.get_full_name()

    # change_list.html
    def changelist_view(self, request, extra_context=None):
        # Aggregate new authors per day for both status choices
        chart_data_pending = (
            Payment.objects.filter(status=Payment.PENDING)
            .annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )

        chart_data_completed = (
            Payment.objects.filter(status=Payment.COMPLETED)
            .annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )

        chart_data_failed = (
            Payment.objects.filter(status=Payment.FAILED)
            .annotate(date=TruncDay("created_at"))
            .values("date")
            .annotate(y=Count("id"))
            .order_by("-date")
        )

        # Serialize and attach the chart data to the template context
        as_json_pending = json.dumps(
            list(chart_data_pending), cls=DjangoJSONEncoder)
        as_json_completed = json.dumps(
            list(chart_data_completed), cls=DjangoJSONEncoder)
        as_json_failed = json.dumps(
            list(chart_data_failed), cls=DjangoJSONEncoder)

        extra_context = extra_context or {
            "chart_data_pending": as_json_pending,
            "chart_data_completed": as_json_completed,
            "chart_data_failed": as_json_failed,
        }
        # Call the superclass changelist_view to render the page

        return super().changelist_view(request, extra_context=extra_context)
    change_list_template = 'admin/payment/payment_change_list.html'


admin.site.register(Payment, PaymentResource)
