from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    fields = ('email', 'first_name', 'is_superuser', 'date_joined',)
    list_display = fields
    ordering = ('date_joined',)
    search_fields = ('email', 'first_name',)

admin.site.register(User, UserAdmin)