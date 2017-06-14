import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-jobs-vacant',
  templateUrl: './jobs-vacant.component.html',
  styleUrls: ['./jobs-vacant.component.css']
})
export class JobsVacantComponent implements OnInit {


    listings:any;
    job:any;
    x:any;
    y:any;
    constructor(private firebaseService:FirebaseService) { }

    ngOnInit() {
      this.firebaseService.getVacancies().subscribe(listings =>
        {
          this.job="Hotel";
        //  console.log(this.listings);
        this.y=listings;
          this.x =JSON.parse(JSON.stringify(listings));
          this.listings=this.x.vacInfo;
           console.log(this.x);
          //var p= this.x.protectedInfo.manId;

          //console.log(this.y.manId);

      }
      );
    }
    apply(key){
      if(confirm("Are you sure you want to apply?"+this.y[key].$key)){
       this.firebaseService.app2(this.y[key].$key);


      //  alert("Successfully Applied");
      }
    }

    salonSearch(){
      this.job="Salon and Spa";

    }
    hotelSearch(){
      this.job="Hotel";

    }

}
