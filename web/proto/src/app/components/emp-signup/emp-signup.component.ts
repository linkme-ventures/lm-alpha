import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';
import {ViewEncapsulation} from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmpSignupComponent implements OnInit {

  data: any;
//cropper:ImageCropperComponent;
//cropperSettings:CropperSettings;
 empSignForm = new FormGroup ({
    details: new FormGroup ({
      name: new FormControl(),
      pos: new FormControl(),
      exp: new FormControl(),
      num: new FormControl(),
      email: new FormControl(),
      uid: new FormControl(),
      sal: new FormControl(),
      profession_type: new FormControl()
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

    if(!(<HTMLInputElement>document.getElementById('image_employee')).files[0]){
        alert("Please upload photo");
    }
    else{
      if((this.empSignForm.get('pwdGrp.password1').value)==(this.empSignForm.get('pwdGrp.password2').value)){
        alert(this.firebaseService.employeeSignup(this.empSignForm.value));
        {
          var that=this;

            //this.router.navigate(['/login']);
            setTimeout(function() { that.router.navigate(['/login']); }, 5000);

        };

      }else{
        alert("The 2 passwords are not matching");
      };
    }
  }

}
