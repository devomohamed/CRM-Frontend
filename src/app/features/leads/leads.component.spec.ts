import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadsComponent } from './leads.component';
import { LeadService } from '../../services/lead.service';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('LeadsComponent', () => {
  let component: LeadsComponent;
  let fixture: ComponentFixture<LeadsComponent>;
  let leadService: jasmine.SpyObj<LeadService>;

  beforeEach(async () => {
    const leadServiceSpy = jasmine.createSpyObj('LeadService', ['getLeads', 'createLead', 'updateLead', 'deleteLead']);

    await TestBed.configureTestingModule({
      imports: [LeadsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: LeadService, useValue: leadServiceSpy },
        MessageService
      ]
    }).compileComponents();

    leadService = TestBed.inject(LeadService) as jasmine.SpyObj<LeadService>;
    leadService.getLeads.and.returnValue(of({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 }));

    fixture = TestBed.createComponent(LeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
