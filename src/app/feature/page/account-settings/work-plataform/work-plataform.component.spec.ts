import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlataformComponent } from './work-plataform.component';

describe('WorkPlataformComponent', () => {
  let component: WorkPlataformComponent;
  let fixture: ComponentFixture<WorkPlataformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlataformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlataformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
