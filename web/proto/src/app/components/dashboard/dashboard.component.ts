import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allEmpDetails: any = [];
  
  constructor(private firebaseService: FirebaseService, private router: Router) {
  	console.log('Routes comp: ', JSON.stringify(router.config, undefined, 2));
   }

  ngOnInit() {
  	
  	this.firebaseService.getAllEmployees().subscribe(managedEmps => {
 		managedEmps.forEach((emp) => {
	  		this.firebaseService.getEmployee(emp.$key).subscribe(showEmp => {
			 	this.allEmpDetails.push(showEmp);
			 });
  		});
	});
  }

}
