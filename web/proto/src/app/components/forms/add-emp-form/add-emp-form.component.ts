import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-emp-form',
  templateUrl: './add-emp-form.component.html',
  styleUrls: ['./add-emp-form.component.css']
})
export class AddEmpFormComponent implements OnInit {
  
  empSignForm = new FormGroup ({
  		details: new FormGroup ({
			name: new FormControl(),
			pos: new FormControl(),
			exp: new FormControl(),
			num: new FormControl(),
			email: new FormControl(),
			uid: new FormControl(),
			sal: new FormControl(),
			loy: new FormControl(),
			csa: new FormControl(),
			clen: new FormControl(),
			act: new FormControl(),
			comm: new FormControl(),
			profession_type: new FormControl()
		}),	
		pwdGrp: new FormGroup ({
			password1: new FormControl(),
	   		password2: new FormControl(),
    	})
	});

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if((this.empSignForm.get('pwdGrp.password1').value)==(this.empSignForm.get('pwdGrp.password2').value)){
      this.firebaseService.addEmployee(this.empSignForm.value);

    }else{
      alert("The 2 passwords are not matching");
    };

  }

}
