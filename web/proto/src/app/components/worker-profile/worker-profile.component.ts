import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {DataService} from '../../services/data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit {
  id:any;
  x:any;
  applicant: any;

  imageUrl:any;
  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private dataService:DataService
  ) { }

  ngOnInit() {
    // Get ID

    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getEmployee(this.id).subscribe(applicant => {
      this.applicant = applicant;

      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.applicant.path);
      storageRef.child(this.applicant.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });
  //  alert(this.dataService.data);
  }
  enter_otp(){
     var s= prompt("Enter OTP sent to woker", "");
     this.firebaseService.validate_OTP(this.dataService.data,s,this.id).subscribe(keys =>{
       //console.log(keys);
       //alert(s);
       if(keys.random_key==s){
         alert("Correct OTP");
        var ans= confirm("Are you Sure you want to add the employee?");
        if (ans){
          console.log(keys);
        //  alert(this.dataService.data);
      //    this.name_list=response;
          //this.next[this.i]=key.$key;
          //alert(keys.$key);
        //  this.x =JSON.parse(JSON.stringify(response));
        //  console.log(this.x);
         this.firebaseService.assign_free_employee(this.dataService.data,this.id,this.applicant.name);
          //this.firebaseService.assign_free_employee(this.dataService.data,this.id){}
        //  alert(this.id);

        }
       }else{
         alert("Wrong OTP");
       }
     });
  }
  make_id()
{
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));


    this.firebaseService.add_random_key(this.dataService.data,text,this.id);



  //  alert(text);
}

}
