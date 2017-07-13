import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';


declare var $:any;

@Component({
  selector: 'app-owner-signup',
  templateUrl: './owner-signup.component.html',
  styleUrls: ['./owner-signup.component.css']
})
export class OwnerSignupComponent implements OnInit {

  data: any;

  signForm = new FormGroup ({
    details: new FormGroup ({
      person_name: new FormControl(),
      organisation_name: new FormControl(),
      num: new FormControl(),
      email: new FormControl(),
      registration_number: new FormControl(),
      organisation_type: new FormControl()
    }), 
    pwdGrp: new FormGroup ({
        password1: new FormControl(),
        password2: new FormControl(),
      })
  });

  user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService)  {
        this.user = afAuth.authState;
     
     }

 ngOnInit() {
      $.getScript('../assets/js/material-kit.js');
  }


  onSubmit(){
    if((this.signForm.get('pwdGrp.password1').value)==(  this.signForm.get('pwdGrp.password2').value)){
      this.firebaseService.addOwner(this.signForm.value);
    }else{
      alert("The 2 passwords are not matching");
    };

  }

}
