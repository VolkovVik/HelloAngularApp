import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpmoduleComponent } from './httpmodule.component';

describe('HttpmoduleComponent', () => {
  let component: HttpmoduleComponent;
  let fixture: ComponentFixture<HttpmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpmoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
