# Generated by Django 4.2.5 on 2023-10-24 23:02

from django.db import migrations, models
import django.db.models.deletion
import products.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('desc', models.TextField(blank=True, verbose_name='Description')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.IntegerField(default=1)),
                ('hard_drive_type', models.CharField(blank=True, choices=[('SSD', 'SSD'), ('HDD', 'HDD')], max_length=255, null=True)),
                ('hard_drive_capacity', models.CharField(blank=True, choices=[('256GB', '256GB'), ('512GB', '512GB'), ('1TB', '1TB'), ('2TB', '2TB'), ('4TB', '4TB'), ('8TB', '8TB'), ('16TB', '16TB')], max_length=255, null=True)),
                ('ram', models.CharField(blank=True, choices=[('4GB', '4GB'), ('8GB', '8GB'), ('16GB', '16GB'), ('32GB', '32GB'), ('64GB', '64GB')], max_length=255, null=True)),
                ('cpu', models.CharField(blank=True, choices=[('Intel Core i3', 'Intel Core i3'), ('Intel Core i5', 'Intel Core i5'), ('Intel Core i7', 'Intel Core i7'), ('AMD Ryzen 3', 'AMD Ryzen 3'), ('AMD Ryzen 5', 'AMD Ryzen 5'), ('AMD Ryzen 7', 'AMD Ryzen 7')], max_length=255, null=True)),
                ('screen_size', models.CharField(blank=True, choices=[('13 inch', '13 inch'), ('15 inch', '15 inch'), ('17 inch', '17 inch'), ('20 inch', '20 inch')], max_length=255, null=True)),
                ('resolution', models.CharField(blank=True, choices=[('1920x1080', '1920x1080'), ('2560x1440', '2560x1440'), ('3840x2160', '3840x2160'), ('7680x4320', '7680x4320')], max_length=255, null=True)),
                ('graphics_card', models.CharField(blank=True, choices=[('Intel Iris Xe Graphics', 'Intel Iris Xe Graphics'), ('AMD Radeon RX 6600', 'AMD Radeon RX 6600'), ('NVIDIA GeForce RTX 3060', 'NVIDIA GeForce RTX 3060'), ('AMD Radeon RX 6700 XT', 'AMD Radeon RX 6700 XT'), ('NVIDIA GeForce RTX 3070', 'NVIDIA GeForce RTX 3070')], max_length=255, null=True)),
                ('brand', models.CharField(blank=True, choices=[('Dell', 'Dell'), ('Apple', 'Apple'), ('Asus', 'Asus'), ('HP', 'HP'), ('Lenovo', 'Lenovo'), ('MSI', 'MSI')], max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='ProductCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Category name')),
                ('icon', models.ImageField(blank=True, upload_to=products.models.category_image_path)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Product Category',
                'verbose_name_plural': 'Product Categories',
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=products.models.product_image_path)),
                ('name', models.CharField(choices=[('COVER-IMAGE', 'cover-image'), ('SLIDE-IMAGES', 'slide-images')], max_length=255)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(on_delete=models.SET(products.models.get_default_product_category), related_name='product_list', to='products.productcategory'),
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ManyToManyField(blank=True, related_name='product_images', to='products.productimage'),
        ),
    ]
