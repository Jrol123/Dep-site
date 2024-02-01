from django.urls import path
from . import views

urlpatterns = [
    path('vkr-topics/', views.vkr_topics),

    path('vkr-archive/', views.vkr_archive),
    path('vkr-archive/add-files/', views.vkr_archive_add_file),
    path('vkr-archive/receive-list-files/', views.vkr_archive_selection_group),
    path('vkr-archive/selection-group/', views.vkr_archive_selection_group),
    path('vkr-archive/remove-file-open/', views.vkr_archive_remove_file_open),
    path('vkr-archive/remove-file/', views.vkr_archive_remove_file),

    path('vkr-result-table/', views.result_table_role_check),
    path('creat-vkr-protection/', views.creat_vkr_protection),
    
    path('teaching-materials/', views.teaching_materials),
    path('teaching-materials/add-file/', views.teaching_materials_add_file),
    path('teaching-materials/receive-list-files/', views.teaching_materials_selection_group),
    path('teaching-materials/selection-group/', views.teaching_materials_selection_group),
    path('teaching-materials/remove-file-open/', views.teaching_materials_remove_file_open),
    path('teaching-materials/remove-file/', views.teaching_materials_remove_file),

    path('creating-vkr-protection/', views.creating_vkr_protection),
    path('vkr-protection-organization/', views.vkr_protection_organization),
    path('vkr-receiving-protection-date/', views.vkr_receiving_protection_date),
    path('vkr-receiving-commissions/', views.vkr_receiving_commissions),
    path('vkr-booking-commission/', views.vkr_booking_commission),
    path('vkr-booking-topics/', views.vkr_booking_topics),
]