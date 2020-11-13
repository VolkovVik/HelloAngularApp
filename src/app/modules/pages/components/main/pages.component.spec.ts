import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { PagesComponent } from './pages.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateBy']);
const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of();
    }
  },
  data: {
    subscribe() {
      return of({
        title: "Title",
        description: "description"
      });
    }
  }
};

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [PagesComponent],
      providers:[
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
