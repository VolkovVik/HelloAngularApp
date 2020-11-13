import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DinamicComponent } from '../dinamic/dinamic.component';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent implements OnInit {

  items = ["Tom", "Bob", "Sam", "Bill"];
  condition: boolean = true;
  count: number = 5;
  i: number = 0;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    setTimeout(() => {
      var factory = this.componentFactoryResolver.resolveComponentFactory(DinamicComponent);
      var component = this.viewContainerRef.createComponent(factory);

      (component.instance as DinamicComponent).value = {
        title: 'title1',
        author: 'autor'
      }
    }, 3000);
  }

  toggle() {
    this.condition = !this.condition;
  }

  @ViewChild('book', { read: ViewContainerRef }) book: ViewContainerRef;

  addBook() {

    console.log(this.book);

    this.book.clear();
    let сomponent = this.componentFactoryResolver.resolveComponentFactory(DinamicComponent);
    let сomponentRef = this.book.createComponent(сomponent);

    (сomponentRef.instance as DinamicComponent).value = {
      title: `Great Expectations ${this.i}`,
      author: 'Charles Dickens'
    };
    this.i++;
  }
}
