# Generated by Django 4.2.2 on 2023-06-19 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_alter_order_address_alter_order_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.CharField(choices=[('Preparing', 'Preparing'), ('Shipped', 'Shipped'), ('Successful', 'Successful'), ('Cancelled', 'Cancelled')], default='PR', max_length=255),
        ),
    ]