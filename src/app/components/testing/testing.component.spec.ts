import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

import { TestingComponent } from './testing.component';

describe('TestingComponent', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;
  let userService: UserService;
  let spy: jasmine.Spy;
  let mockUser;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [TestingComponent],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    mockUser = { name: 'Victor' };
    spy = spyOn(userService, 'getOne').and.returnValues(of(mockUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService', () => {
    component.method();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set user', () => {
    component.method();
    expect(component.user).toBe(mockUser);
  });
});
