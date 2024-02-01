from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Avg

from .forms import *
from django.core.paginator import Paginator

import json


def post_book_view(request):
    if request.method == 'POST':
        # Получение данных
        book_file = request.FILES['book_file']
        name_book = request.POST.get('nameBook')
        author_full_name = request.POST.get('authorFullName')
        description_book = request.POST.get('descriptionBook')
        name_discipline = request.POST.get('nameDiscipline')
        discipline_obj = Discipline.objects.get(name=name_discipline)

        # Проверка обложки
        try:
            book_img = request.FILES['book_img']
            Book.objects.create(user=request.user, title=name_book, author=author_full_name, discipline=discipline_obj,
                                description=description_book, file=book_file, cover=book_img)
        except:
            Book.objects.create(user=request.user, title=name_book, author=author_full_name, discipline=discipline_obj,
                                description=description_book, file=book_file)

        # # Сохранение файла book_file в папку media
        # with open('media/' + book_file.name, 'wb+') as destination_file:
        #     for chunk in book_file.chunks():
        #         destination_file.write(chunk)

        # # Сохранение изображения book_img в папку media
        # with open('media/' + book_img.name, 'wb+') as destination_img:
        #     for chunk in book_img.chunks():
        #         destination_img.write(chunk)

        return JsonResponse({'message': 'Файл успешно добавлен в папку media'}, status=200)


def library(request):
    books_all = Book.objects.all().order_by('id')
    paginator = Paginator(books_all, 5)
    page_number = request.GET.get('page')
    books = paginator.get_page(page_number)
    discipline_list = []
    disciplines = Discipline.objects.all().order_by('name')
    for discipline in disciplines:
        discipline_list.append(discipline.name)

    return render(request, 'library/library.html', {
        'books': books,
        'discipline_list': discipline_list,
    })


def order_by(request, order_by):
    if order_by == 'user':
        books = Book.objects.order_by('user__username')
    elif order_by == 'discipline':
        books = Book.objects.order_by('discipline__name')
    elif order_by == 'average_rating':
        books = Book.objects.order_by('-average_rating')
    else:
        books = Book.objects.order_by(order_by)
    paginator = Paginator(books, 5)
    page_number = request.GET.get('page')
    books = paginator.get_page(page_number)
    discipline_list = []
    disciplines = Discipline.objects.all().order_by('name')
    for discipline in disciplines:
        discipline_list.append(discipline.name)
    return render(request, 'library/library.html', {
        'books': books,
        'order_by': order_by,
        'discipline_list': discipline_list,
    })


def book_info(request, pk):
    book = get_object_or_404(Book, pk=pk)
    reviews = book.reviews.all()
    average_rating = book.average_rating

    try:
        cur_user_mark = Mark.objects.get(author=request.user, book=book).mark
    except:
        cur_user_mark = 0

    try:
        cur_user_review = Review.objects.get(author=request.user, book=book).text
    except:
        cur_user_review = ""

    if request.method == 'POST':
        data = json.loads(request.body)  # Попытка загрузить данные из тела запроса как JSON
        review_text = data.get('review')
        starsPut = data.get('starsPut')
        if review_text != None:
            user_review = Review.objects.get_or_create(author=request.user, book=book)
            user_review = Review.objects.get(author=request.user, book=book)
            user_review.text = review_text
            user_review.save()

        elif starsPut != None:
            user_mark = Mark.objects.get_or_create(author=request.user, book=book)
            user_mark = Mark.objects.get(author=request.user, book=book)
            user_mark.mark = starsPut
            user_mark.save()
            marks = book.marks.all().exclude(mark=0)  # только для подсчета рейтинга
            average_rating = marks.aggregate(Avg('mark'))['mark__avg']
            book.average_rating = average_rating
            book.save()
        return redirect('/library/book/' + str(pk), pk)

    if average_rating:
        average_rating = round(average_rating, 1)

    discipline_list = []
    disciplines = Discipline.objects.all().order_by('name')
    for discipline in disciplines:
        discipline_list.append(discipline.name)

    return render(request, 'library/book.html', {
        'user': request.user,
        'book': book,
        'reviews': reviews,
        'average_rating': average_rating,
        'user_mark': cur_user_mark,
        'user_review': cur_user_review,
        'discipline_list': discipline_list,
    })


def render_reviews(request, pk):
    book = get_object_or_404(Book, pk=pk)
    reviews = book.reviews.all()
    reviews_list = []
    for review in reviews:
        mark_is_exist = Mark.objects.filter(author=review.author, book=book).exists()
        if mark_is_exist:
            mark = Mark.objects.get(author=review.author, book=book).mark
        else:
            mark = 0
        reviews_list.append({
            'fullName': review.author.username,
            'reviewText': review.text,
            'mark': mark
        })
    return JsonResponse({'reviews': reviews_list})
