import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-review-emp',
  templateUrl: './review-emp.component.html',
  styleUrls: ['./review-emp.component.css']
})
export class ReviewEmpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
        $.getScript('../assets/js/star-rating-init.js');
     }
}
