import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../services/task.service';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'createTask', 'updateTask', 'deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TasksComponent, TranslateModule.forRoot()],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        MessageService
      ]
    }).compileComponents();

    taskServiceSpy.getTasks.and.returnValue(of({ data: [], total: 0, page: 1, limit: 10, totalPages: 0 }));
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
