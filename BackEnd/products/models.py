# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()


def category_image_path(instance, filename):
    return f"product/category/icons/{instance.name}/{filename}"


def product_image_path(instance, filename):
    return f"product/images/{instance.name}/{filename}"


class ProductCategory(models.Model):
    name = models.CharField(_("Category name"), max_length=100)
    icon = models.ImageField(upload_to=category_image_path, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Product Category")
        verbose_name_plural = _("Product Categories")

    def __str__(self):
        return self.name


def get_default_product_category():
    return ProductCategory.objects.get_or_create(name="Others")[0]


class Product(models.Model):
    category = models.ForeignKey(
        ProductCategory,
        related_name="product_list",
        on_delete=models.SET(get_default_product_category),
    )
    name = models.CharField(max_length=200)
    desc = models.TextField(_("Description"), blank=True)
    image = models.ManyToManyField(
        'ProductImage', related_name="product_images", blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.IntegerField(default=1)

    HARD_DRIVE_TYPE_CHOICES = (
        ("SSD", _("SSD")),
        ("HDD", _("HDD")),
    )

    HARD_DRIVE_CAPACITY_CHOICES = (
        ("256GB", _("256GB")),
        ("512GB", _("512GB")),
        ("1TB", _("1TB")),
        ("2TB", _("2TB")),
        ("4TB", _("4TB")),
        ("8TB", _("8TB")),
        ("16TB", _("16TB")),
    )

    RAM_CHOICES = (
        ("4GB", _("4GB")),
        ("8GB", _("8GB")),
        ("16GB", _("16GB")),
        ("32GB", _("32GB")),
        ("64GB", _("64GB")),
    )

    CPU_CHOICES = (
        ("Intel Core i3", _("Intel Core i3")),
        ("Intel Core i5", _("Intel Core i5")),
        ("Intel Core i7", _("Intel Core i7")),
        ("AMD Ryzen 3", _("AMD Ryzen 3")),
        ("AMD Ryzen 5", _("AMD Ryzen 5")),
        ("AMD Ryzen 7", _("AMD Ryzen 7")),
    )

    SCREEN_SIZE_CHOICES = (
        ("13 inch", _("13 inch")),
        ("15 inch", _("15 inch")),
        ("17 inch", _("17 inch")),
        ("20 inch", _("20 inch")),
    )

    RESOLUTION_CHOICES = (
        ("1920x1080", _("1920x1080")),
        ("2560x1440", _("2560x1440")),
        ("3840x2160", _("3840x2160")),
        ("7680x4320", _("7680x4320")),
    )

    GRAPHICS_CARD_CHOICES = (
        ("Intel Iris Xe Graphics", _("Intel Iris Xe Graphics")),
        ("AMD Radeon RX 6600", _("AMD Radeon RX 6600")),
        ("NVIDIA GeForce RTX 3060", _("NVIDIA GeForce RTX 3060")),
        ("AMD Radeon RX 6700 XT", _("AMD Radeon RX 6700 XT")),
        ("NVIDIA GeForce RTX 3070", _("NVIDIA GeForce RTX 3070")),
    )

    BRAND_CHOICES = (
        ("Dell", _("Dell")),
        ("Apple", _("Apple")),
        ("Asus", _("Asus")),
        ("HP", _("HP")),
        ("Lenovo", _("Lenovo")),
        ("MSI", _("MSI"))
    )

    hard_drive_type = models.CharField(
        max_length=255, blank=True, null=True, choices=HARD_DRIVE_TYPE_CHOICES)
    hard_drive_capacity = models.CharField(
        max_length=255, blank=True, null=True, choices=HARD_DRIVE_CAPACITY_CHOICES)
    ram = models.CharField(max_length=255, blank=True,
                           null=True, choices=RAM_CHOICES)
    cpu = models.CharField(max_length=255, blank=True,
                           null=True, choices=CPU_CHOICES)
    screen_size = models.CharField(
        max_length=255, blank=True, null=True, choices=SCREEN_SIZE_CHOICES)
    resolution = models.CharField(
        max_length=255, blank=True, null=True, choices=RESOLUTION_CHOICES)
    graphics_card = models.CharField(
        max_length=255, blank=True, null=True, choices=GRAPHICS_CARD_CHOICES)

    brand = models.CharField(max_length=255, blank=True,
                             null=True, choices=BRAND_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    IMAGE_CHOICES = ((("COVER-IMAGE"), _("cover-image")),
                     (("SLIDE-IMAGES"), _("slide-images")),)

    image = models.ImageField(upload_to=product_image_path)
    name = models.CharField(
        max_length=255, choices=IMAGE_CHOICES, unique=False)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
