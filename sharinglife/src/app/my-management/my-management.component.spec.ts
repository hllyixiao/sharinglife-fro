import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyManagementComponent } from './my-management.component';

describe('MyManagementComponent', () => {
  let component: MyManagementComponent;
  let fixture: ComponentFixture<MyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
