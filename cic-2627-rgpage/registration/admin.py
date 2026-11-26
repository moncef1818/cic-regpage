from django.contrib import admin
from .models import Candidate, Department, DepartmentPreference

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

class DepartmentPreferenceInline(admin.TabularInline):
    model = DepartmentPreference
    extra = 0
    can_delete = False
    readonly_fields = ('department', 'preference_order')
    ordering = ('preference_order',)

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'school', 'year', 'created_at')
    list_filter = ('school', 'year', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)
    inlines = [DepartmentPreferenceInline]
    fieldsets = (
        ('Personal Information', {
            'fields': ('first_name', 'last_name', 'age', 'email', 'phone_number')
        }),
        ('Academic Details', {
            'fields': ('school', 'school_other', 'year')
        }),
        ('Club Questions & Links', {
            'fields': ('why_this_club', 'links', 'privacy_agreed')
        }),
        ('Metadata', {
            'fields': ('created_at',)
        }),
    )
