import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signForm = new FormGroup ({
    person_name: new FormControl(),
    organisation_name: new FormControl(),
    exp: new FormControl(),
    num: new FormControl(),
    email: new FormControl(),
    password1: new FormControl(),
    password2: new FormControl(),
    registration_number: new FormControl(),
    organisation_type: new FormControl(),
    details: new FormControl(),
    isManager:new FormControl()
  });

  user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService)  {
        this.user = afAuth.authState;
     }

  ngOnInit() {
  }
  onSubmit(){
    if((this.signForm.get('password1').value)==(this.signForm.get('password2').value)){
      this.firebaseService.addOwner(this.signForm.value);
    //  this.afAuth.auth.createUserWithEmailAndPassword(this.signForm.get('email').value, this.signForm.get('password1').value).then((success) => {
    //    console.log(success);
    //      	console.log(this.afAuth.auth.currentUser.uid);

    //  }).catch((error) => {

  	 // alert(error.message);
  	//  console.log(error);
  	//});
;
    }else{
      alert("The 2 passwords are not matching");
    };

  }

}
