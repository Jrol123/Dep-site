from django.shortcuts import render
from .models import *
from django.http import JsonResponse

def grades(request):
    group = request.user.study_group

    return render(request, 'disciplins/grades.html', {
        'group': group,
    })

def receiving_grades(request):
    grades_all = Grades.objects.filter(user = request.user, term = request.POST.get('term'))

    grades_data = []
    for grade in grades_all:
        grade_object = [grade.subject.name, grade.subject.type, grade.grade, grade.date.strftime('%d.%m.%Y'), grade.fio_teacher]
        grades_data.append(grade_object)

    return JsonResponse({'grades_data': grades_data})


def disciplins_for_choice(request):
    group = request.user.study_group

    return render(request, 'disciplins/disciplins_for_choice.html', {
        'group': group,
    })

def receiving_electives(request):
    electives_all = GroupElectives.objects.filter(group = request.user.study_group)

    electives_data = []
    for electives in electives_all:
        electives_group = []
        for elective in electives.electives.all():
            electives_group.append({
                'name': elective.name
            })
        electives_data.append(electives_group)

    return JsonResponse({'electives_data': electives_data})