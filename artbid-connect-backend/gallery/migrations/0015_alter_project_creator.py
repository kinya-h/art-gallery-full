# Generated by Django 4.2.1 on 2024-03-09 00:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0014_alter_collaborator_artist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_creator', to='gallery.artist'),
        ),
    ]
