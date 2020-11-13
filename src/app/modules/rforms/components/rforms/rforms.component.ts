import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-rforms',
  templateUrl: './rforms.component.html',
  styleUrls: ['./rforms.component.scss']
})
export class RformsComponent implements OnInit {

  name: FormControl;
  fullName: FormGroup;
  userListControl: FormGroup;
  profileForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.name = new FormControl('Viktor', [Validators.required, Validators.minLength(5), myValidator1(4)], [myValidatorAsync]);
    this.name.valueChanges.subscribe((value) => console.log(value));
    this.name.statusChanges.subscribe((status) => {
      console.log(this.name.errors);
      console.log(status);
    });


    /* this.fullName = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    }); */
    this.fullName = this.formBuilder.group({
      firstName: [''], lastName: [''],
    });
    this.fullName.valueChanges.subscribe((value) => console.log(value));
    this.fullName.statusChanges.subscribe((status) => {
      console.log(this.fullName.errors);
      console.log(status);
    });


    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, myValidator1(4)]],
      lastName: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
    });
    this.profileForm.valueChanges.subscribe((value) => console.log(value));
    this.profileForm.statusChanges.subscribe((status) => {
      console.log(this.profileForm.errors);
      console.log(status);
    });


    //this.userListControl = new FormGroup({
    //  users: new FormArray([
    //    new FormControl('Vik'),
    //    new FormControl('Alice'),
    //    new FormControl('Oleg'),
    //    new FormControl('Tom')
    //  ])
    //});
    this.userListControl = this.formBuilder.group({
      users: this.formBuilder.array([['Alice'], ['Vik'], ['Tom']])
    });
    this.userListControl.valueChanges.subscribe((value) => console.log(value));
    this.userListControl.statusChanges.subscribe((status) => {
      console.log(this.userListControl.errors);
      console.log(status);
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  getUserControl() {
    return (this.userListControl.controls['users'] as FormArray).controls;
  }

  removeUserControl(index: number) {
    (this.userListControl.controls['users'] as FormArray).removeAt(index);
  }

  addUserControl() {
    (this.userListControl.controls['users'] as FormArray).push(new FormControl(''));
  }
}

function myValidator1(number: number) {
  return (formControl: FormControl) => {
    if (formControl.value.length < number) {
      return {
        myValidator1: { message: 'Less 4' }
      };
    }
    return null;
  }
}

function myValidator(formControl: FormControl) {
  if (formControl.value.length < 3) {
    return {
      myValidator: { message: 'Less 3' }
    };
  }
  return null;
}

function myValidatorAsync(formControl: FormControl): Observable<null | any> {
  if (formControl.value.length < 7) {
    return of({ myValidator: { message: 'Less 7 async' } });
  }
  return of(null);
}