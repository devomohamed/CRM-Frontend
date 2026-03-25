import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealsComponent } from './deals.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DealsComponent', () => {
  let component: DealsComponent;
  let fixture: ComponentFixture<DealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
