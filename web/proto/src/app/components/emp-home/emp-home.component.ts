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
  accepted:any;
  organisation:any;
  random_string:any;
  x:any;
  i:number;

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth, private router: Router) {
    this.accepted=[];
    this.random_string=[];
    this.organisation=[];

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
  search(){
  //  this.router.navigate(['/job-search']);
  }
  search_companies(){
  //  this.router.navigate(['/job-search']);
  }
  accepted_requests(){
  this.router.navigate(['/accepted-list']);
  }
  search_jobs(){
    var x=this.firebaseService.check_if_free_employee();
    //this.router.navigate(['/job-search']);
    x.subscribe(keys => {
				keys.forEach(key => {
					if(key.$key=='name'){
						//var x=1;
          //  alert("U ARE A FREE EMPLOYEE");
            this.router.navigate(['/jobs-vacant']);

					}
					//this.checkjobadd.push(key);
				//console.log(this.checkjobadd.length);
						});
            if(keys==""){
            alert("Sorry ! You are a working Employee! You Cannot search for Jobs unless you quit the present job. ");
            }
			});
    //alert(x);
  }

}
