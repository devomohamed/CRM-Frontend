import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketsComponent } from './tickets.component';
import { TicketService } from '../../services/ticket.service';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  beforeEach(async () => {
    const ticketServiceSpy = jasmine.createSpyObj('TicketService', ['getTickets', 'createTicket', 'updateTicket', 'deleteTicket']);

    await TestBed.configureTestingModule({
      imports: [TicketsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: TicketService, useValue: ticketServiceSpy },
        MessageService
      ]
    }).compileComponents();

    ticketServiceSpy.getTickets.and.returnValue(of({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 }));
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
