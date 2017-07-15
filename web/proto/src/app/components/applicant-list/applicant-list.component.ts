import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {DataService} from '../../services/data.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {
  id:any;
  name_list:any;
  i:number;
  next:any;
  listings:any;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private dataService:DataService
  ) { }

  routing(a){
    this.dataService.data=this.id;
    this.router.navigate(['/user/applicant-profile/'+a]);
  }

  ngOnInit() {
    this.next=[];
    this.listings=[];

        this.i=0;
      this.id = this.route.snapshot.params['id'];
  this.firebaseService.showApplicants(this.id).subscribe(keys => {
      keys.forEach(key => {
      //  this.checkjobadd.push(key);
      this.firebaseService.showApplicantName(key.$key).subscribe(response =>{
    //    this.name_list=response;
        //this.next[this.i]=key.$key;

        this.listings[this.i++]=response;

      });
        //alert(key.$key);

      });

      //console.log(this.checkjobadd.length);
          });



  }


}
