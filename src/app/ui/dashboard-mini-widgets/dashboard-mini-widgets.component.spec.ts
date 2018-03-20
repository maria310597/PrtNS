import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMiniWidgetsComponent } from './dashboard-mini-widgets.component';

describe('DashboardMiniWidgetsComponent', () => {
  let component: DashboardMiniWidgetsComponent;
  let fixture: ComponentFixture<DashboardMiniWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMiniWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMiniWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
