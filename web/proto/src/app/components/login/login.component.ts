import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
	user: Observable<firebase.User>;
	email: string;
	password: string;


	loginForm = new FormGroup ({
		em: new FormControl(),
		pass: new FormControl()
	});

  constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService) {
  	console.log('Routes comp: ', JSON.stringify(router.config, undefined, 2));
    this.user = afAuth.authState;
  }

  login() {
  	//console.log(this.loginForm);
  	this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('em').value, this.loginForm.get('pass').value).then((success) => {
  		console.log(success);
  		this.firebaseService.getManager(this.afAuth.auth.currentUser.uid).subscribe(manager => {
  			if(manager.val()!=null){
  				this.router.navigate(['/home']);
  			}else{
  				this.router.navigate(['/emp-home']);
  			}
  		});
  		console.log(this.afAuth.auth.currentUser.uid);

  	}).catch((error) => {
	  // Handle Errors here.
	  /*var errorCode = error.code;
	  var errorMessage = error.message;
	  if (errorCode === 'auth/wrong-password') {
	    alert('Wrong password.');
	  } else {
	    alert(errorMessage);
	  }*/
	  alert("Invalid username or password");
	  console.log(error);
	});
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  signup(){
    this.router.navigate(['/signup']);

  }

  ngOnInit() {

  }


}
