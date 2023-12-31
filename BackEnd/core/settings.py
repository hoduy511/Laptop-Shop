"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""


import os
from pathlib import Path

from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-hz#%+dkm&k@=(iwa0-uzsoo8^$h2tkl5634xyn3sw*ef!@^k9e'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*',]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_celery_beat',
    'django_celery_results',

    # others apps
    'django.contrib.sites',
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'dj_rest_auth.registration',
    'phonenumber_field',
    'corsheaders',
    'drf_yasg',
    # 'drf_spectacular',

    # apps
    'users',
    'products',
    'orders',
    'payment',
]

# SIMPLE_JWT = {
#    'AUTH_HEADER_TYPES': ('Bearer',),
# }

CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_ALLOW_ALL = True

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.cache.FetchFromCacheMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR,
            os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Ho_Chi_Minh'

USE_I18N = True

USE_TZ = False


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Authentication
AUTHENTICATION_BACKENDS = [
    'users.backends.phone_backend.PhoneNumberAuthBackend',
    'users.backends.email_backend.EmailAuthBackend',
]

REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticatedOrReadOnly'
    # ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
        # 'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100,
    # 'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}


# SOCIALACCOUNT_PROVIDERS = {
#     'google': {
#         'APP': {
#             'client_id': '972458697499-2hnjci7j7io517p50vkfg72jo34hd0g1.apps.googleusercontent.com',
#             'secret': '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',
#             'key': '',
#         },
#         'SCOPE': [
#             'profile',
#             'email',
#         ],
#         'AUTH_PARAMS': {
#             'access_type': 'online',
#         },
#         'VERIFIED_EMAIL': True,
#     },
# }

SITE_ID = 1


REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access-token',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh-token',
    'RETURN_REFRESH_TOKEN': True,
    'JWT_AUTH_HTTPONLY': False,
    'JWT_AUTH_SECURE': True,
}

# ACCOUNT_EMAIL_VERIFICATION SETTINGS
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'


# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'shoplaptop85@gmail.com'
EMAIL_HOST_PASSWORD = 'unlr cgmc trkg utmn'
DEFAULT_FROM_EMAIL = 'shoplaptop85@gmail.com'

# <EMAIL_CONFIRM_REDIRECT_BASE_URL>/<key>
EMAIL_CONFIRM_REDIRECT_BASE_URL = \
    'http://localhost:3000/email/confirm/'

# <PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL>/<uidb64>/<token>/
PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL = \
    'http://localhost:3000/password-reset/confirm/'

# Phone number field
PHONENUMBER_DEFAULT_REGION = 'VN'

# Token length for OTP
TOKEN_LENGTH = 6

# Token expiry
TOKEN_EXPIRE_MINUTES = 3

# Twilio
TWILIO_ACCOUNT_SID = config()
TWILIO_AUTH_TOKEN = config()
TWILIO_PHONE_NUMBER = config()


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, '../', 'mediafiles')


STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, '../', 'staticfiles')


# Stripe
STRIPE_PUBLISHABLE_KEY = 'pk_test_51OBJ1aJbhG9XeLpgozBoW7WSsFdRLOa9oIs16k9sxDypcYCpKkV2bJm4H7DlvJFphgMAKsb1ZVyNQmRfuz9eS9ur00OcprV9xJ'
STRIPE_SECRET_KEY = 'sk_test_51OBJ1aJbhG9XeLpggbO4SCa7KFCufD8sU5SBsNABXzj6NbFFp6s3KDX3mpDHAZX8wg8z7nLLhg1ZDl7UbQH6hWqr00vvSpnCWY'
STRIPE_WEBHOOK_SECRET = 'whsec_055694a377e3617438e3c91c1146850411b8bda341c4e2cd36c3597d37b36f40'

BACKEND_DOMAIN = 'http://127.0.0.1:8000'
FRONTEND_DOMAIN = 'http://localhost:3000'

PAYMENT_SUCCESS_URL = 'http://localhost:3000/checkout/success/'
PAYMENT_CANCEL_URL = 'http://localhost:3000/checkout/failed/'


CELERY_RESULT_BACKEND = "django-db"
CELERY_BROKER_URL = config('CELERY_BROKER_REDIS_URL',
                           default='redis://localhost:6379')
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers.DatabaseScheduler'


# # Redis Cache
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.redis.RedisCache',
#         'LOCATION': "redis://redis:6379/0"
#     },
# }

# CACHE_MIDDLEWARE_ALIAS = 'default'
# CACHE_MIDDLEWARE_SECONDS = 3600
# CACHE_MIDDLEWARE_KEY_PREFIX = ''
