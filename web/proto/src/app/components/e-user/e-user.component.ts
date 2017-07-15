import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-e-user',
  templateUrl: './e-user.component.html',
  styleUrls: ['./e-user.component.css']
})
export class EUserComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
	$.getScript('../assets/js/material-dashboard.js');
  }
}
