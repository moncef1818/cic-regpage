from django.test import TestCase

from .models import Candidate, Department
from .serializers import CandidateCreateSerializer


class CandidateCreateSerializerTests(TestCase):
    def setUp(self):
        self.department_1 = Department.objects.create(name='Cybersecurity')
        self.department_2 = Department.objects.create(name='Artificial Intelligence')
        self.department_3 = Department.objects.create(name='Development')
        self.department_4 = Department.objects.create(name='Design and Media')

    def test_rejects_more_than_three_department_preferences(self):
        data = {
            'first_name': 'Alice',
            'last_name': 'Test',
            'email': 'alice@example.com',
            'school': 'National School Of Cybersecurity',
            'year': '1',
            'department_preferences': [
                {'department': self.department_1.id, 'preference_order': 1},
                {'department': self.department_2.id, 'preference_order': 2},
                {'department': self.department_3.id, 'preference_order': 3},
                {'department': self.department_4.id, 'preference_order': 4},
            ],
        }

        serializer = CandidateCreateSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn('department_preferences', serializer.errors)
