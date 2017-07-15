import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-e-profile',
  templateUrl: './e-profile.component.html',
  styleUrls: ['./e-profile.component.css']
})
export class EProfileComponent implements OnInit {
  
  empForm = new FormGroup ({
		details: new FormGroup ({
	      name: new FormControl(),
	      pos: new FormControl(),
	      exp: new FormControl(),
	      num: new FormControl(),
	      email: new FormControl(),
	      sal: new FormControl(),
	      image: new FormControl(),
	      path: new FormControl(),
	    })
	});

	showEmp: any;

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
	  this.firebaseService.getEmployee(this.afAuth.auth.currentUser.uid).subscribe(showEmp => {
			 	this.empForm.get('details').setValue(showEmp);
			 	this.showEmp = showEmp;
			 });
  }

  onSubmit() {
  		console.log(this.empForm.value);
  		this.firebaseService.updateEmployee(this.empForm.value);
  }

}
