'''
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
'''
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from dj_rest_auth.registration.views import VerifyEmailView, ResendEmailVerificationView
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from dj_rest_auth.views import PasswordResetView,  PasswordResetConfirmView, PasswordChangeView, LogoutView
# from products.views import PublisherDocumentView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.views import GoogleLogin



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include("users.urls", namespace="users")),
    # path("api/products/", include("products.urls", namespace="products")),
    # path("api/user/orders/", include("orders.urls", namespace="orders")),
    # path("api/user/payments/", include("payment.urls", namespace="payment")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path(
        "resend-email/", ResendEmailVerificationView.as_view(), name="rest_resend_email"
    ),
    re_path(
        r"^account-confirm-email/(?P<key>[-:\w]+)/$",
        VerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "account-email-verification-sent/",
        TemplateView.as_view(),
        name="account_email_verification_sent",
    ),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path("user/login/google/", GoogleLogin.as_view(), name="google_login"),
    path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
]


schema_view = get_schema_view(
    openapi.Info(
        title='ShopLapTop-API',
        default_version='v1',
        description='APIs for ShopLapTop',
        contact=openapi.Contact(email="hoduy244@gmail.com"),
        license=openapi.License(name="Hồ Ngọc Duy"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns += [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)