from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Department(models.Model):

    DEPARTMENT_CHOICES = [

        ('Cybersecurity', 'Cybersecurity'),
        ('Ethical Hacking', 'Ethical Hacking'),
        ('Development', 'Development'),
        ('Electronics and Robotics','Electronics and Robotics')
        ('Design and Media', 'Design and Media'),
        ('Artificial Intelligence', 'Artificial Intelligence'),
        ('External Relations (ER)', 'External Relations (ER)'),
        ('HR', 'HR'),
        ('Logistics', 'Logistics'),
        
    ]
    name = models.CharField(max_length=100,choices=DEPARTMENT_CHOICES, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Candidate(models.Model):

    SCHOOL_CHOICES = [
        ('National School Of Cybersecurity', 'NSCS'),
        ('National School Of Artificial Intelligence', 'ENSIA'),
        ('National School Of Mathematics', 'NHSM'),
        ('National School Of Autonomous Systems Technology', 'NHSAT'),
        ('National School Of Nanoscience And Nanoechnology', 'NHNN'),
        ('National School Of Computer Science', 'ESI'),
        ('Other', 'Other')
    ]

    YEAR_CHOICES = [
        ('1', 'First Year'),
        ('2', 'Second Year'),
        ('3', 'Third Year'),
        ('4', 'Fourth Year'),
        ('5', 'Fifth Year'),
    ]


    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField(blank=True, null=True)

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    school = models.CharField(max_length=100, choices=SCHOOL_CHOICES)
    year = models.CharField(max_length=10, choices=YEAR_CHOICES)
    
    why_this_club = models.TextField(blank=True, null=True)

    telegram_username = models.CharField(max_length=100, blank=True, null=True)
    

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class DepartmentPreference(models.Model):

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="department_preferences"
        )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="preferences"
        )
    preference_order = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(3)
            ],
        help_text="Enter a number between 1 and 3 to indicate your preference order."
    )
    why_this_department = models.TextField(blank=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['candidate', 'department'],
                name='unique_department_per_candidate'
            ),
            models.UniqueConstraint(
                fields=['candidate', 'preference_order'],
                name='unique_order_per_candidate'
            ),
        ]
        ordering = ['preference_order']

    def __str__(self):
        return f"{self.candidate} - {self.department} (Preference {self.preference_order})"