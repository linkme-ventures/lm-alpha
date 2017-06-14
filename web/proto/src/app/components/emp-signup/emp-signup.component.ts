import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css']
})
export class EmpSignupComponent implements OnInit {

  data: any;
//cropper:ImageCropperComponent;
//cropperSettings:CropperSettings;
  empSignForm = new FormGroup ({
    name: new FormControl(),

    num: new FormControl(),
    email: new FormControl(),
    password1: new FormControl(),
    password2: new FormControl(),
    profession_type: new FormControl(),
    details: new FormControl()
  });

  user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService)  {
        this.user = afAuth.authState;

     }

  ngOnInit() {
  }
  onSubmit(){
    if((this.empSignForm.get('password1').value)==(this.empSignForm.get('password2').value)){
      this.firebaseService.employeeSignup(this.empSignForm.value);

    }else{
      alert("The 2 passwords are not matching");
    };

  }

}
