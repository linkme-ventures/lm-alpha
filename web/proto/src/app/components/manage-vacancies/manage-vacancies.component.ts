import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-manage-vacancies',
  templateUrl: './manage-vacancies.component.html',
  styleUrls: ['./manage-vacancies.component.css']
})
export class ManageVacanciesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$.getScript('../assets/js/material-dashboard.js');
  }

}
