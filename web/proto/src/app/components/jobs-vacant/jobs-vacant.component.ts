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
    isFree: any;

    constructor(private firebaseService:FirebaseService) { }

    ngOnInit() {
      this.firebaseService.check_if_free_employee().subscribe(availEmpData =>
        {
          if(availEmpData==""){
            this.isFree=false;
          }
          else{
            this.isFree=true; 
          }  
        });
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
      if(this.isFree){
        if(confirm("Are you sure you want to apply?"+this.y[key].$key)){
          this.firebaseService.app2(this.y[key].$key);
        }
      }
      else{
        alert("Sorry ! You are a working Employee! You Cannot search for Jobs unless you quit the present job. ");
      }
    }

    salonSearch(){
      this.job="Salon and Spa";
    }

    hotelSearch(){
      this.job="Hotel";
    }

}
