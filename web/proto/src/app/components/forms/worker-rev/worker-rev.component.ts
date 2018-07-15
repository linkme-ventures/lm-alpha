import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
declare var $:any;

@Component({
  selector: 'app-worker-rev',
  templateUrl: './worker-rev.component.html',
  styleUrls: ['./worker-rev.component.css']
})
export class WorkerRevComponent implements OnInit {

id:any;
  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  addReviewForm = new FormGroup ({
    skills: new FormControl(),
    hygiene: new FormControl(),
    social: new FormControl(),
    punct: new FormControl(),
    behav: new FormControl(),
    comments: new FormControl()
  });

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    alert(this.id);
  }


  onSubmit(){

    Object.keys(this.addReviewForm.controls).forEach(key => {
        var ele;
        ele = <HTMLInputElement>document.getElementById('star-rtin-'+key);
        if(ele!=null && ele != undefined){
            this.addReviewForm.controls[key].patchValue(ele.value);
        }
    });
    console.log(this.addReviewForm.value);
     //firebase service call here
     var reviewID=this.firebaseService.addReviewService(this.addReviewForm);
     //alert(reviewID);
    var reviewflag= this.firebaseService.addReviewIdToEmployee(this.id,reviewID);
    if(reviewflag==1){
      alert("Your Review is added successfully");
    }

  }

}
