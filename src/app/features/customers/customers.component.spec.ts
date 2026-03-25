import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersComponent } from './customers.component';
import { CustomerService } from '../../services/customer.service';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customerService: jasmine.SpyObj<CustomerService>;

  beforeEach(async () => {
    const customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomers', 'createCustomer', 'updateCustomer', 'deleteCustomer']);

    await TestBed.configureTestingModule({
      imports: [CustomersComponent, TranslateModule.forRoot()],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        MessageService
      ]
    }).compileComponents();

    customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    customerService.getCustomers.and.returnValue(of({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 }));

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customers on init', () => {
    expect(customerService.getCustomers).toHaveBeenCalled();
  });
});
