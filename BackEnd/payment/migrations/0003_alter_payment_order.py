# Generated by Django 4.2.5 on 2023-11-05 13:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
        ('payment', '0002_alter_payment_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='order',
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='orders.order'),
        ),
    ]
