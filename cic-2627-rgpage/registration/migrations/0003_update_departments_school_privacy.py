from django.db import migrations, models


def seed_departments(apps, schema_editor):
    Department = apps.get_model('registration', 'Department')

    # Remove legacy departments
    Department.objects.filter(name='Aura').delete()
    Department.objects.filter(name='Organization').delete()

    # Ensure all canonical departments exist
    departments = [
        'Cybersecurity',
        'Ethical Hacking',
        'Development',
        'Electronics and Robotics',
        'Design and Media',
        'Artificial Intelligence',
        'External Relations (ER)',
        'HR',
        'Logistics',
    ]
    for dept_name in departments:
        Department.objects.get_or_create(name=dept_name)


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0002_alter_department_name'),
    ]

    operations = [
        # 1. Update Department name choices: add Electronics and Robotics, remove Aura
        migrations.AlterField(
            model_name='department',
            name='name',
            field=models.CharField(
                choices=[
                    ('Cybersecurity', 'Cybersecurity'),
                    ('Ethical Hacking', 'Ethical Hacking'),
                    ('Development', 'Development'),
                    ('Electronics and Robotics', 'Electronics and Robotics'),
                    ('Design and Media', 'Design and Media'),
                    ('Artificial Intelligence', 'Artificial Intelligence'),
                    ('External Relations (ER)', 'External Relations (ER)'),
                    ('HR', 'HR'),
                    ('Logistics', 'Logistics'),
                ],
                max_length=100,
                unique=True,
            ),
        ),

        # 2. Add school_other field to Candidate
        migrations.AddField(
            model_name='candidate',
            name='school_other',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),

        # 3. Widen school field (no longer restricted to choices list at DB level)
        migrations.AlterField(
            model_name='candidate',
            name='school',
            field=models.CharField(max_length=150),
        ),

        # 4. Add privacy_agreed field to Candidate
        migrations.AddField(
            model_name='candidate',
            name='privacy_agreed',
            field=models.BooleanField(default=False),
        ),

        # 5. Remove why_this_department from DepartmentPreference
        migrations.RemoveField(
            model_name='departmentpreference',
            name='why_this_department',
        ),

        # 6. Seed departments data
        migrations.RunPython(seed_departments, migrations.RunPython.noop),
    ]
