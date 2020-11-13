import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

export class Phone {
  constructor(
    public title: string,
    public price: number,
    public company: string
  ) {}
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public phone: string
  ) {}
}

// Состояние модели
// Применение директивы ngModel не только устанавливает привязку данных, но и позволяет отслеживать состояние элемента ввода.
// Для установки состояния Angular применяет к элементам ввода специальные классы CSS:
// ng-untouched - элемент не в фокусе
// ng-touched - элемент в фокусе
// ng-dirty - первоначальное значение изменено
// ng-pristine - первоначальное значение не изменено
// ng-valid - значение корректно
// ng-invalid - значение некорректно
// Валидация
// Для проверки используется механизм валидации.В Angular мы можем использовать валидацию HTML5, которая применяется в виде атрибутов:
// required: требует обязательного ввода значения
// pattern: задает регулярное выражение, которому должны соответствовать вводимые данные

// novalidate Этот атрибут отключает отображение встроенных в браузер сообщений об ошибках валидациию. Ведь в нашем случае мы полагаемся на механизм валидации в Angular.

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  phones: Phone[] = [];
  companies: string[] = [
    'Apple',
    'Huawei',
    'Xiaomi',
    'Samsung',
    'LG',
    'Motorola',
    'Alcatel',
  ];

  phone: Phone = new Phone('xxx', 1230, 'Huawei');
  selectedPhone123: Phone = new Phone('xxx', 1230, 'Huawei');
  user: User = new User('Victor', 'volkov.vik1@gmail.com', '0987654321');

  constructor() {}

  ngOnInit(): void {}

  addPhone() {
    console.log(this.phone.title);
    console.log(this.phone.price);
    console.log(this.phone.company);
    this.phones.push(
      new Phone(this.phone.title, this.phone.price, this.phone.company)
    );
  }

  addPhone1(title: NgModel, price: NgModel, comp: NgModel) {
    console.log(title);
    console.log(price);
    console.log(comp);
    this.phones.push(new Phone(title.value, price.value, comp.value));
  }

  onTitleChange() {
    console.log(this.phone.title);

    if (this.phone.title == 'нет') this.phone.title = 'неизвестно';
  }

  addUser() {
    console.log(this.user);
  }

  name: string = 'Victor';
  email: string;
  userphone: string = '123456789master';

  submit(form: NgForm) {
    console.log(form);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
