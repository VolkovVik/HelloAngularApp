import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateValueComponent } from './template-value.component';

describe('TemplateValueComponent', () => {
  let component: TemplateValueComponent;
  let fixture: ComponentFixture<TemplateValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
