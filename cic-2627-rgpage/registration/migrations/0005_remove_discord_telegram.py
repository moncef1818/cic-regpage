from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0004_split_design_media'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='candidate',
            name='discord_username',
        ),
        migrations.RemoveField(
            model_name='candidate',
            name='telegram_username',
        ),
    ]
