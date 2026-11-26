from django.db import migrations, models


def split_design_media(apps, schema_editor):
    Department = apps.get_model('registration', 'Department')

    # Remove the combined department if it still exists
    Department.objects.filter(name='Design and Media').delete()

    # Seed the two new separate departments
    Department.objects.get_or_create(name='Design')
    Department.objects.get_or_create(name='Media')


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0003_update_departments_school_privacy'),
    ]

    operations = [
        # Update the choices on the Department model field
        migrations.AlterField(
            model_name='department',
            name='name',
            field=models.CharField(
                choices=[
                    ('Cybersecurity', 'Cybersecurity'),
                    ('Ethical Hacking', 'Ethical Hacking'),
                    ('Development', 'Development'),
                    ('Electronics and Robotics', 'Electronics and Robotics'),
                    ('Design', 'Design'),
                    ('Media', 'Media'),
                    ('Artificial Intelligence', 'Artificial Intelligence'),
                    ('External Relations (ER)', 'External Relations (ER)'),
                    ('HR', 'HR'),
                    ('Logistics', 'Logistics'),
                ],
                max_length=100,
                unique=True,
            ),
        ),

        # Seed the split departments
        migrations.RunPython(split_design_media, migrations.RunPython.noop),
    ]
