import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {

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

	showEmp: any;
	
  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth, private router: Router) { 

  }

  ngOnInit() {
  		this.firebaseService.getEmployee(this.afAuth.auth.currentUser.uid).subscribe(showEmp => {
		 	this.empForm.setValue(showEmp);
		 	this.showEmp = showEmp;
		 });
  }

  onSubmit() {
  		console.log(this.empForm.value);
  		this.firebaseService.updateEmployee(this.empForm.value);
  }

}
