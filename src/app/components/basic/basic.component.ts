import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  mycolor = 'red';
  title = 'привязка данных';
  image = 'https://avatars3.githubusercontent.com/u/66230852?v=4';

  constructor() { }

  ngOnInit(): void { }

  getTitle(): string {
    return this.title;
  }

  setTitle(title:string) {
    this.title = title;
  }

  setColor(color: string) {
    this.mycolor = color;
  }

  setRandomColor() {
    this.mycolor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }
}
