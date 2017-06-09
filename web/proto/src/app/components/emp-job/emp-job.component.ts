import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-emp-job',
  templateUrl: './emp-job.component.html',
  styleUrls: ['./emp-job.component.css']
})
export class EmpJobComponent implements OnInit {

  listings:any;
  job:any;
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getJobList().subscribe(listings =>
      {
        this.job="Hotel";
        console.log(listings);
      this.listings=listings;
    }
    );
  }

  salonSearch(){
    this.job="Salon and Spa";

  }
  hotelSearch(){
    this.job="Hotel";

  }

}
