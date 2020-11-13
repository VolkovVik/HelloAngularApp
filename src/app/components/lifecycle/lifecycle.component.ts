import { Component, Input, OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.scss']
})
export class LifecycleComponent implements OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit {

  title: string = 'LifecycleComponent';

  @Input() name: string;

  constructor() { this.log(`constructor`); }

  ngOnInit() { this.log(`onInit`); }

  ngOnChanges(changes: SimpleChanges) {
    this.log(`OnChanges`);
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  ngDoCheck() {       
    this.log(`ngDoCheck`);
  }
  ngAfterViewInit() {     
    this.log(`ngAfterViewInit`);
  }
  ngAfterViewChecked() {     
    this.log(`ngAfterViewChecked`);
  }
  ngAfterContentInit() {     
    this.log(`ngAfterContentInit`);
  }
  ngAfterContentChecked() {     
    this.log(`ngAfterContentChecked`);
  }

  private log(msg: string) {
    console.log(`${this.title}  ${msg}`);
  }
}