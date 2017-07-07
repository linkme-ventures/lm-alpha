import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  private lastPoppedUrl: string;	

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  	this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev) => {
            if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl)
                    this.lastPoppedUrl = undefined;
                else{
                    document.getElementById("navbar").scrollIntoView();
                }
            }
        });
  }

    ngAfterViewInit(){
 		$.getScript('../assets/js/material-dashboard.js');
 	}
}
