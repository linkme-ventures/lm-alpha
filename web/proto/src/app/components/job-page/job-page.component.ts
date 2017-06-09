import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {
  id:any;
  job: any;
  job_apply: jobApply;
  imageUrl:any;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) { }


    ngOnInit() {
      // Get ID
      this.id = this.route.snapshot.params['id'];

      this.firebaseService.getCompanyDetails(this.id).subscribe(job => {
        this.job = job;

        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(this.job.orgnaisation_image_path);
        storageRef.child(this.job.orgnaisation_image_path).getDownloadURL().then((url) => {
          // Set image url
          this.imageUrl = url;
        }).catch((error) => {
          console.log(error);
        });
      });
    }
    apply(){
  
    var key=  this.firebaseService.applyJob(this.id);

    }


}
interface jobApply{
  fromId?: any;
  toId?: any;
  accepted?: string;
  cancelled?: string;
  rejected?: string;

}
