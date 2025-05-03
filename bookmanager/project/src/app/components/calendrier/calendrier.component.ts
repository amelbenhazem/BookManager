import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  template: `
    <div class="calendar-container">
      <h2>Calendrier des réservations</h2>
      <div #calendar></div>
    </div>
  `,
  styles: [`
    .calendar-container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    #calendar {
      margin-top: 20px;
    }
  `]
})
export class CalendrierComponent implements AfterViewInit {
  @ViewChild('calendar') calendarEl!: ElementRef;

  ngAfterViewInit() {
    const calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek'
      },
      events: [
        { title: 'Réservation 1', date: '2025-05-05' },
        { title: 'Réservation 2', date: '2025-05-10' }
      ],
      editable: true,
      locale: 'fr'
    });

    calendar.render();
  }
}