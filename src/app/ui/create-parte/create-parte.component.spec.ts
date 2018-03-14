import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParteComponent } from './create-parte.component';

describe('CreateParteComponent', () => {
  let component: CreateParteComponent;
  let fixture: ComponentFixture<CreateParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
