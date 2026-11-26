from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Candidate, DepartmentPreference, Department
from .serializers import CandidateSerializer, CandidateCreateSerializer

@api_view(["GET"])
def candidate_list(request):

    queryset = Candidate.objects.all().order_by('-created_at')
    serializer = CandidateSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def candidate_create(request):

    serializer = CandidateCreateSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer.save()

    return Response(
        {"message": "Candidate created successfully"},
        status=status.HTTP_201_CREATED
    )

@api_view(["GET"])
def helath_check(request):
    return Response({"message": "OK"})
