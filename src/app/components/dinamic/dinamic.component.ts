import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinamic',
  templateUrl: './dinamic.component.html',
  styleUrls: ['./dinamic.component.scss']
})
export class DinamicComponent implements OnInit {

  value: any = null;

  constructor() { }

  ngOnInit(): void { }

}
