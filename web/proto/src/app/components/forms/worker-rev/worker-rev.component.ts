import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

declare var $:any;

@Component({
  selector: 'app-worker-rev',
  templateUrl: './worker-rev.component.html',
  styleUrls: ['./worker-rev.component.css']
})
export class WorkerRevComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  addReviewForm = new FormGroup ({
    skills: new FormControl(),
    hygiene: new FormControl(),
    social: new FormControl(),
    punct: new FormControl(),
    behav: new FormControl(),
    comments: new FormControl()
  });

  ngOnInit() {     
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
  }

}
