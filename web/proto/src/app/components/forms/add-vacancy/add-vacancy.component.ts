import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit {

  manInfo:any;
  addVacancyForm = new FormGroup ({
    job_role: new FormControl(),
    job_salary: new FormControl(),
    job_gender: new FormControl(),
    job_address: new FormControl(),
    job_category: new FormControl()
  });

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getManagerInfo().subscribe(managerInfo => {
      this.manInfo = managerInfo;
    });
  }
  onSubmit(){
  //  this.addVacancyForm.job_category.value=this.manInfo.organisation_type;
    this.firebaseService.addJobRequirements(this.addVacancyForm.value);
  }
}
