import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	empForm = new FormGroup ({
		name: new FormControl(),
		pos: new FormControl(),
		exp: new FormControl(),
		num: new FormControl(),
		email: new FormControl(),
		uid: new FormControl(),
		sal: new FormControl(),
		loy: new FormControl(),
		csa: new FormControl(),
		clen: new FormControl(),
		act: new FormControl(),
		comm: new FormControl()
	});

	managedEmps: any;
	showEmp: any;
  manInfo: any;
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {

  		this.firebaseService.getAllEmployees().subscribe(managedEmps => {
  			this.managedEmps = managedEmps;
  		});
      this.firebaseService.getManagerInfo().subscribe(managerInfo => {
        this.manInfo = managerInfo;
        console.log(this.manInfo.num);
      });
  }
  edit(){
      this.router.navigate(['/owner-profile']);
  }
  add_vacancies(){
      this.router.navigate(['/add-vacancies']);
  }

  onSubmit() {
  		console.log(this.empForm.value);
  		this.firebaseService.addEmployee(this.empForm.value);
  }

  displEmp(managedEmp){
		 this.firebaseService.getEmployee(managedEmp.$key).subscribe(showEmp => {
		 	this.showEmp = showEmp;
		 });
  }
}
