import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListComponent } from './show-list.component';

describe('ShowListComponent', () => {
  let component: DraftListComponent;
  let fixture: ComponentFixture<DraftListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
