# Generated by Django 4.2.5 on 2023-11-03 19:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('P', 'pending'), ('C', 'completed'), ('F', 'failed')], default='P', max_length=1)),
                ('payment_option', models.CharField(choices=[('P', 'paypal'), ('S', 'stripe')], max_length=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='orders.order')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]
