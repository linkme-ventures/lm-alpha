import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";
import { AngularFireAuth } from 'angularfire2/auth';

declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  private lastPoppedUrl: string;	

  constructor(public afAuth: AngularFireAuth, private router: Router, private location: Location) { }

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

  logout(){
    var notify=confirm("Are you sure to logout?");
    if(notify){
      this.afAuth.auth.signOut().then(() => {
        console.log('logged out'); 
        this.router.navigate(['/login']);
      });
    }     
  }

    ngAfterViewInit(){
 		$.getScript('../assets/js/material-dashboard.js');
 	}
}
