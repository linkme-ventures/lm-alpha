import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {
  displOwn:any;
  image1Url:any;
  x:number;
  image2Url:any;
  updateOwnerForm = new FormGroup ({
    person_name: new FormControl(),
    organisation_name: new FormControl(),
    exp: new FormControl(),
    num: new FormControl(),
    email: new FormControl(),
    registration_number: new FormControl(),
    organisation_type: new FormControl(),
    details: new FormControl(),
    isManager:new FormControl(),
    image_owner:new FormControl(),
    image_organisation: new FormControl()

  });

  //user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService)  {
      //  this.user = afAuth.authState;


     }
     ngOnInit() {
       //alert("wait for a while");
       this.x=1;
       this.firebaseService.getOwner(this.afAuth.auth.currentUser.uid).subscribe(displOwn => {
         this.displOwn = displOwn;
         let storageRef = firebase.storage().ref();
         let spaceRef = storageRef.child(this.displOwn.path);
         storageRef.child(this.displOwn.path).getDownloadURL().then((url) => {
           // Set image url
           this.image1Url = url;
         }).catch((error) => {
         //  console.log(error);
         });

         storageRef.child(this.displOwn.orgnaisation_image_path).getDownloadURL().then((url) => {
           // Set image url
           this.image2Url = url;
           //alert(this.image2Url);
         }).catch((error) => {
           console.log(error);
         });
           });

     }

     waitSeconds(iMilliSeconds) {
         var counter= 0
             , start = new Date().getTime()
             , end = 0;
         while (counter < iMilliSeconds) {
             end = new Date().getTime();
             counter = end - start;
         }
     }
     onSubmit() {
     		//console.log(this.updateOwnerForm.value);


     		let c = this.firebaseService.updateOwner(this.updateOwnerForm.value);
         //this.firebaseService.updateOwner(c);
         document.getElementById("submit_update_owner").innerHTML="Are you Sure to  Make the Changes? ";

         this.firebaseService.updateOwner(this.updateOwnerForm.value);

        //  document.getElementById("submit_update_owner").value = "Remove from Favorite";






     }
}
