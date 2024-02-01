from django.shortcuts import render
from .models import Room, Booking, TIME_SLOTS
import datetime
from django.http import JsonResponse


def booking(request):
    return render(request, 'booking/booking_audience.html')


def date_selection(request):
    if request.method == 'POST':
        selected_date = datetime.datetime.strptime(request.POST.get('date'), '%Y-%m-%d').date()
        rooms = Room.objects.filter(room_num__in=[952, 953])
        room_slots = {}
        for room in rooms:
            bookings = Booking.objects.filter(date=selected_date, room=room)
            booked_slots = bookings.values_list('time', flat=True)
            all_slots = {}
            for slot in TIME_SLOTS:
                all_slots[slot] = slot not in booked_slots
            room_slots[room.room_num] = all_slots
        return JsonResponse({'room_slots': room_slots})
    
    
def booking_audience(request):
    if request.method == 'POST':
        date = datetime.datetime.strptime(request.POST.get('date'), '%Y-%m-%d').date()
        audience = Room.objects.get(room_num=int(request.POST.get('audience')[1:]))
        time = request.POST.get('time')
        print(date)
        print(audience)
        print(time)
        if not Booking.objects.filter(date=date, time=time, room=audience).exists():
            Booking.objects.create(date=date, time=time, room=audience, teacher=None)

    return JsonResponse({'message': 'Аудитория успешно забронирована'}, status=200)