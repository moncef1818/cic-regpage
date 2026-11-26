from rest_framework import serializers
from .models import Candidate, Department, DepartmentPreference

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class DepartmentPreferenceSerializer(serializers.ModelSerializer):
    department = serializers.SlugRelatedField(
        queryset=Department.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = DepartmentPreference
        fields = [
            "id",
            "department",
            "preference_order",
            "why_this_department",
        ]

class CandidateSerializer(serializers.ModelSerializer):

    department_preferences = DepartmentPreferenceSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Candidate
        fields = [
            "id",
            "first_name",
            "last_name",
            "age",
            "email",
            "phone_number",
            "school",
            "year",
            "why_this_club",
            "discord_username",
            "telegram_username",
            "links",
            "department_preferences",
            "created_at",
        ]

class CandidateCreateSerializer(serializers.ModelSerializer):

    department_preferences = DepartmentPreferenceSerializer(
        many=True
    )

    class Meta:
        model = Candidate
        fields = [
            "first_name",
            "last_name",
            "age",
            "email",
            "phone_number",
            "school",
            "year",
            "why_this_club",
            "discord_username",
            "telegram_username",
            "links",
            "department_preferences",
        ]

    def validate_department_preferences(self, value):
        if len(value) != 3:
            raise serializers.ValidationError(
                "A candidate must choose exactly 3 departments."
            )

        departments = [
            item["department"]
            for item in value
        ]

        orders = [
            item["preference_order"]
            for item in value
        ]

        if len(departments) != len(set(departments)):
            raise serializers.ValidationError(
                "Duplicate departments are not allowed."
            )

        if set(orders) != {1, 2, 3}:
            raise serializers.ValidationError(
                "Preference orders must be exactly 1, 2, and 3."
            )

        return value

    def create(self, validated_data):

        preferences_data = validated_data.pop(
            "department_preferences"
        )

        candidate = Candidate.objects.create(
            **validated_data
        )

        for preference in preferences_data:
            DepartmentPreference.objects.create(
                candidate=candidate,
                **preference
            )

        return candidate