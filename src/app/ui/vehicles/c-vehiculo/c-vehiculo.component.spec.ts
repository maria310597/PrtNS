import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVehiculoComponent } from './c-vehiculo.component';

describe('CVehiculoComponent', () => {
  let component: CVehiculoComponent;
  let fixture: ComponentFixture<CVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
