import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data: any;
//cropper:ImageCropperComponent;
//cropperSettings:CropperSettings;
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
      //  this.cropperSettings = new CropperSettings();
      //  this.cropperSettings.noFileInput = true;
      //  this.data = {};
     }

  ngOnInit() {
  }
//  hi(){
//    alert("hi");
//  }
  //fileChangeListener($event) {
  //  var image:any = new Image();

  //  var file:File = $event.target.files[0];
  //  var myReader:FileReader = new FileReader();
//    var that = this;
  //  myReader.onloadend = function (loadEvent:any) {
    //    image.src = loadEvent.target.result;
      //  that.cropper.setImage(image);
    //  image.onload = function() {
//  that.cropper.setImage(image);
//  }
    //};
    //myReader.readAsDataURL(file);
//}
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
      //this.router.navigate(['/login']);
    }else{
      alert("The 2 passwords are not matching");
    };

  }

}
