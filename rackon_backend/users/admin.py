from django.contrib import admin

# Register your models here.

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
<<<<<<< HEAD
from .models import User
=======
from .models import *
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'role', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('username',)

admin.site.register(User, CustomUserAdmin)
<<<<<<< HEAD
=======
admin.site.register(PasswordResetOTP)
>>>>>>> 6a7aeac8ac21e36e7c4d32aa04c14446c07a7ca2
