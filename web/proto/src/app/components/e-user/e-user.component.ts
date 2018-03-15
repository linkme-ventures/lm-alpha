import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';


declare var $:any;

@Component({
  selector: 'app-e-user',
  templateUrl: './e-user.component.html',
  styleUrls: ['./e-user.component.css']
})
export class EUserComponent implements OnInit, AfterViewInit {

  isFree: any;	

  constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
  	this.firebaseService.check_if_free_employee().subscribe(availEmpData =>
    {
      if(availEmpData==""){
        this.isFree=false;
      }
      else{
        this.isFree=true; 
      }  
    });
  }

  ngAfterViewInit(){
	$.getScript('../assets/js/material-dashboard.js');
  }

  navSearchJobs(){
  	if(!this.isFree){
	  	var notify=confirm("Your Business Owner will be notified. Are you sure to search for jobs?");
	  	if(notify){
	  		this.firebaseService.setNotify();
	    	this.router.navigate(['/e-user/search-jobs']);
	  	}
	  	else{
	  		this.router.navigate(['/e-user/profile']);
	  	}
	}
	else{
  		this.router.navigate(['/e-user/search-jobs']);
  	}		  	
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

}
