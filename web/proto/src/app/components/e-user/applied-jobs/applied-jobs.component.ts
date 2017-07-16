import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  
   x:any;
   listings:any;
   i:number;
   next:any;
  
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.listings=[];
    this.next=[];
    this.i=0;

this.firebaseService.accepted_requests_list().take(1).subscribe( acceptedReqs => {

	this.firebaseService.see_jobs_added().subscribe(keys => {
     keys.forEach(key => {
       this.firebaseService.see_job_details((key.$key)).subscribe(details =>
         {
           console.log(details);
           this.next[this.i]=key.$key;
           acceptedReqs.forEach(acceptedReq => {
				if(acceptedReq.$key == key.$key){
			   		details['otp'] = acceptedReq.random_key;
				}
           });    
  	       this.listings[this.i++]=details;
       }
       );
         });
   });

});
 
  }

  delete_job(index){
    var x=confirm("Are you sure you want to delete this job application?");
    if(x){
         var c=this.firebaseService.delete_appl(index);
    }
  }

}
