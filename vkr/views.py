from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from users.models import User, StudyGroup
from .models import Commission, Thesis, TeachingMaterial, StudentReport
from django.http import JsonResponse
from django.shortcuts import render
from datetime import datetime
import os


def teaching_materials(request):
    groups = StudyGroup.objects.all()
    group_names = [group.name for group in groups]
    return render(request, 'vkr/teaching_materials.html', {
        'group_names': group_names,
    })


def vkr_topics(request):
    return render(request, 'vkr/vkr_topics.html')


def vkr_archive(request):
    groups = StudyGroup.objects.all()
    group_names = [group.name for group in groups]
    return render(request, 'vkr/vkr_archive.html', {
        'group_names': group_names,
    })


def creat_vkr_protection(request):
    groups = StudyGroup.objects.all()
    group_names = [group.name for group in groups]
    return render(request, 'vkr/creat_vkr_protection.html', {
        'group_names': group_names,
    })


def vkr_protection_organization(request):
    return render(request, 'vkr/vkr_protection_organization.html')


@login_required
@require_POST
def creating_vkr_protection(request):
    date_str = request.POST.get('date')
    time_str = request.POST.get('time')
    full_name_secretary = request.POST.get('fullNameSecretary')
    full_name_members = request.POST.getlist('fullNameMembers[]')

    # новое
    group_names = set(request.POST.getlist('groups[]'))

    date = datetime.strptime(date_str, '%d.%m.%Y').date()
    time = datetime.strptime(time_str, '%H:%M').time()

    # Разбить полное имя секретаря на имя, фамилию и отчество
    last_name_secretary, first_name_secretary, patronymic_secretary = full_name_secretary.split()
    secretary = User.objects.get(last_name=last_name_secretary, first_name=first_name_secretary,
                                 patronymic=patronymic_secretary, is_secretary=True)
    # Разбить полные имена членов комиссии на имена, фамилии и отчества
    members = [secretary]
    for full_name_member in full_name_members:
        last_name_member, first_name_member, patronymic_member = full_name_member.split()
        member = User.objects.get(last_name=last_name_member, first_name=first_name_member,
                                  patronymic=patronymic_member)
        members.append(member)

    commission_study_group = []
    for group_name in group_names:
        group = StudyGroup.objects.get(name=group_name)
        commission_study_group.append(group)

    commission = Commission.objects.create(
        date=date,
        time=time,
        chairman=request.user,
    )

    commission.members.set(members)
    commission.groups.set(commission_study_group)
    commission.save()

    return JsonResponse({"message": "Комиссия успешно создана"})


# Получение дат комиссий для группы авторизованного пользователя
@login_required
@require_POST
def vkr_receiving_protection_date(request):
    group = request.user.study_group
    commissions = Commission.objects.filter(groups__in=[group])
    dates = set()
    for commission in commissions:
        if commission.defender is None:
            dates.add(commission.date.strftime('%d.%m.%Y'))

    dates = sorted(dates)

    return JsonResponse({"dates": dates})


# Получение комиссий для группы авторизованного пользователя на определенную дату
@login_required
@require_POST
def vkr_receiving_commissions(request):
    group = request.user.study_group
    date = datetime.strptime(request.POST.get('date'), '%d.%m.%Y').date()

    commissions = Commission.objects.filter(date=date, groups__in=[group], defender=None).order_by('time')
    commission_list = []
    for commission in commissions:
        commission_info = {
            'time': commission.time.strftime('%H:%M'),
            'members': [f"{member.last_name} {member.first_name} {member.patronymic}" for member in
                        commission.members.all()],
        }
        commission_list.append(commission_info)

    return JsonResponse({"commissions": commission_list})


@login_required
@require_POST
def vkr_booking_commission(request):
    confirm_date = datetime.strptime(request.POST.get('date_confirm_commission'), '%d.%m.%Y').date()
    confirm_time = datetime.strptime(request.POST.get('time_confirm_commission'), '%H:%M').time()
    confirm_commission = Commission.objects.filter(date=confirm_date, time=confirm_time).update(defender=request.user)
    return JsonResponse({"test": "yes"})


@login_required
@require_POST
def vkr_booking_topics(request):
    supervisor_lastname, supervisor_firstname, supervisor_patronymic = request.POST.get('full_name').split()
    supervisor = User.objects.get(last_name=supervisor_lastname, first_name=supervisor_firstname,
                                  patronymic=supervisor_patronymic)
    thesis = Thesis.objects.create(
        title=request.POST.get('topic'),
        student=request.user,
        supervisor=supervisor,
        phone=request.POST.get('telephon')  # даня поправь на telephone пж, а лучше всего на phone
    )
    thesis.save()
    return JsonResponse({"test": "yes"})


# НОВОЕ
@login_required
@require_POST
def teaching_materials_add_file(request):
    file_list = request.FILES.getlist('files')

    groups_list = set(request.POST.getlist('groups'))

    if request.method == 'POST' and request.FILES:
        for group in groups_list:
            for file in file_list:
                print("teaching_materials: " + file.name)
                material = TeachingMaterial.objects.create(
                    group=StudyGroup.objects.get(name=group),
                    material=file,
                    user=request.user
                )
                material.save()

    return JsonResponse({"test": "yes"})


@login_required
@require_POST
def teaching_materials_receive_list_files(request):
    return JsonResponse({"test": "yes2"})


@login_required
@require_POST
def teaching_materials_selection_group(request):
    user = request.user
    group_name = request.POST.get('group')

    if user.study_group is None and user.is_staff:
        if group_name is None:
            group = StudyGroup.objects.first()
        else:
            group = StudyGroup.objects.get(name=group_name)
    else:
        if group_name is None:
            group = user.study_group
        else:
            group = StudyGroup.objects.get(name=group_name)

    materials = TeachingMaterial.objects.filter(group=group)

    response_data = {
        "group": group.name,
        "materials": [
            {
                "material_file": material.material.url,
                "material_name": os.path.basename(material.material.name)
            }
            for material in materials
        ]
    }
    return JsonResponse(response_data)


@login_required
@require_POST
def vkr_archive_add_file(request):
    if request.method == 'POST' and request.FILES:
        file_list = request.FILES.getlist('document')
        for file in file_list:
            print("archive: " + file.name)
            report = StudentReport.objects.create(
                student=request.user,
                report=file
            )
            report.save()
    return JsonResponse({"test": "yes"})


@login_required
@require_POST
def vkr_archive_receive_list_files(request):
    return JsonResponse({"test": "yes1"})


@login_required
@require_POST
def vkr_archive_selection_group(request):
    user = request.user
    group_name = request.POST.get('group')

    if user.study_group is None and user.is_staff:
        if group_name is None:
            group = StudyGroup.objects.first()
        else:
            group = StudyGroup.objects.get(name=group_name)
    else:
        if group_name is None:
            group = user.study_group
        else:
            group = StudyGroup.objects.get(name=group_name)

    reports = StudentReport.objects.filter(student__study_group=group)

    response_data = {
        "group": group.name,
        "reports": [
            {
                "student_full_name": f"{report.student.last_name} {report.student.first_name} {report.student.patronymic}",
                "report_file": report.report.url,
                "report_name": os.path.basename(report.report.name)
            }
            for report in reports
        ]
    }
    return JsonResponse(response_data)


# Проверка на роли в итоговой таблице. Вроде ничего не забыл:P
@login_required
def result_table_role_check(request):
    user = request.user
    has_commissions = Commission.objects.filter(members=user).exists()
    if user.study_group is None and has_commissions:
        if user.is_secretary:
            return render(request, 'vkr/result_table.html',
                          {"secretary": 1, "member": 0, "student": 0, "no_commissions": 0})
        else:
            return render(request, 'vkr/result_table.html',
                          {"secretary": 0, "member": 1, "student": 0, "no_commissions": 0})
    elif user.study_group is not None:
        return render(request, 'vkr/result_table.html',
                      {"secretary": 0, "member": 0, "student": 1, "no_commissions": 0})
    else:
        return render(request, 'vkr/result_table.html',
                      {"secretary": 0, "member": 0, "student": 0, "no_commissions": 1})


@login_required
def teaching_materials_remove_file_open(request):
    user = request.user
    user_materials = TeachingMaterial.objects.filter(user=user)
    response_data = {
        "materials": [
            {
                "material_id": material.id,
                "material_file": material.material.url,
                "material_name": os.path.basename(material.material.name)
            }
            for material in user_materials
        ]
    }
    return JsonResponse(response_data)


# НОВОЕ
@login_required
def teaching_materials_remove_file(request):
    remove_file_id = request.POST.get('remove_file_id')
    try:
        report = TeachingMaterial.objects.get(pk=int(remove_file_id))
        report.delete()
    except TeachingMaterial.DoesNotExist:
        return JsonResponse({"test": "yes1"})
    return JsonResponse({"test": "yes1"})


@login_required
def vkr_archive_remove_file_open(request):
    student = request.user
    student_reports = StudentReport.objects.filter(student=student)
    response_data = {
        "reports": [
            {
                "report_id": report.id,
                "report_file": report.report.url,
                "report_name": os.path.basename(report.report.name)
            }
            for report in student_reports
        ]
    }
    return JsonResponse(response_data)


# НОВОЕ
@login_required
def vkr_archive_remove_file(request):
    remove_file_id = request.POST.get('remove_file_id')
    try:
        report = StudentReport.objects.get(pk=int(remove_file_id))
        report.delete()
    except StudentReport.DoesNotExist:
        return JsonResponse({"test": "yes1"})
    return JsonResponse({"test": "yes1"})
