import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobs-added-list',
  templateUrl: './jobs-added-list.component.html',
  styleUrls: ['./jobs-added-list.component.css']
})
export class JobsAddedListComponent implements OnInit {
  x:any;
    listings:any;
    i:number;
    next:any;
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.listings=[];
    this.next=[];
    this.i=0;
   //this.firebaseService.see_jobs_added();
 this.firebaseService.see_jobs_added().subscribe(keys => {
     keys.forEach(key => {
       this.firebaseService.see_job_details((key.$key)).subscribe(details =>
         {
           console.log(details);
           this.next[this.i]=key.$key;

           this.listings[this.i++]=details;

       }
       );
         });
   });
  }

}
