from django.contrib import admin
from .models import *

admin.site.register(Subjects)
admin.site.register(Grades)
admin.site.register(Electives)
admin.site.register(GroupElectives)
admin.site.register(ReceivingElectives)