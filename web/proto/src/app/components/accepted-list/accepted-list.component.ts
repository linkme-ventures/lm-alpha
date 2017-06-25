import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accepted-list',
  templateUrl: './accepted-list.component.html',
  styleUrls: ['./accepted-list.component.css']
})
export class AcceptedListComponent implements OnInit {
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

      this.i=0;
      this.firebaseService.accepted_requests_list().take(1).subscribe(keys => {
    //   this.accepted.push(accepted);
      keys.forEach(key => {
      this.random_string[this.i]=key.random_key;
    //  this.checkjobadd.push(key);
      this.firebaseService.getManagerId(key.$key).subscribe(response =>{
  //    this.name_list=response;
      //this.next[this.i]=key.$key;
      this.x =JSON.parse(JSON.stringify(response));
      //this.listings=this.x.vacInfo;
       this.firebaseService.getOwner(this.x.$value).subscribe(manager =>{

         console.log(manager);
         this.organisation[this.i]=manager.organisation_name;
         this.i++;
       });
      //console.log(response);

      });
      //alert(key.$key);


    });
      // console.log(accepted);
      }
    );
  //  alert(this.random_key[0] +"-"+this.organisation[0]);

  }

}
