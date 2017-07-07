import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$.getScript('../assets/js/material-dashboard.js');
  }

}
