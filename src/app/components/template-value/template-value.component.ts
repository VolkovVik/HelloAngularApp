import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-template-value',
  templateUrl: './template-value.component.html',
  styleUrls: ['./template-value.component.scss']
})
export class TemplateValueComponent implements OnInit {
  title: string = 'TemplateValueComponent';

  counter: number = 0;
  increment() { this.counter++; }
  decrement() { this.counter--; }

  @ViewChild("nameText", { static: false })
  nameParagraph: ElementRef;

  @ContentChild("headerContent", { static: false })
  header: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  change() {
    console.log(this.nameParagraph.nativeElement.textContent);
    this.nameParagraph.nativeElement.textContent = "hell";
  }

  change1() {
    console.log(this.header);
    this.header.nativeElement.textContent = "Hell to world!";
  }
}
