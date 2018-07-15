import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase2 from 'firebase/app';
import * as firebase from 'firebase';
//import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable()
export class FirebaseService {
	employees: FirebaseListObservable<any[]>;
	owners: FirebaseObjectObservable<any[]>;
	empsignup: FirebaseObjectObservable<any[]>;
	managedEmps: FirebaseListObservable<any[]>;
	job: FirebaseObjectObservable<any[]>;
	displEmp: FirebaseObjectObservable<any>;
	displOwn: FirebaseObjectObservable<any>;
	cc:FirebaseObjectObservable<any>;
	folder:any;
	image1:any;
	addit:number;

	checkjobapply:any[];
	job_array:any[];
	checkjobadd:any[];
	job_apply:jobApply;
	addReviewForm:addReviewForm;
	listings: FirebaseListObservable<any[]>;



  constructor(private afDb: AngularFireDatabase, public afAuth: AngularFireAuth) {
		this.folder="OwnerImages";
		this.checkjobapply=[];
		this.checkjobadd=[];
		this.job_array=[];

  }

  getAllEmployees(){
  	this.managedEmps = this.afDb.list('/ManagedEmps/'+this.afAuth.auth.currentUser.uid) as FirebaseListObservable<ManagedEmp[]>;
  	return this.managedEmps;
  }
	getManagerInfo(){

		this.displOwn = this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid) as FirebaseObjectObservable<Owner>;
		return this.displOwn;
	}
  getManager(userId){
  	return this.afDb.object('/Managers/'+userId , { preserveSnapshot: true });
  }

  getEmployee(empUid){
 	console.log("Show emp uid: " + empUid);
  	this.displEmp = this.afDb.object('/Employees/'+empUid) as FirebaseObjectObservable<Employee>;
  	return this.displEmp;
  }

	getOwner(OwnerUid){

		this.displOwn = this.afDb.object('/Managers/'+OwnerUid) as FirebaseObjectObservable<Owner>;
		return this.displOwn;
	}






	addOwner(owner){

					this.afAuth.auth.createUserWithEmailAndPassword(owner.details.email, owner.pwdGrp.password1).then((success) => {
					console.log(success);
					console.log(this.afAuth.auth.currentUser.uid);
					this.owners = this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid) as FirebaseObjectObservable<Owner>;
					let storageRef = firebase.storage().ref();
					for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_owner')).files[0]]){
						let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
						let iRef = storageRef.child(path);
						iRef.put(selectedFile).then((snapshot) => {
							owner.details.image = selectedFile.name;
							owner.details.path = path;
							for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_organisation')).files[0]]){
								let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
								let iRef = storageRef.child(path);
								iRef.put(selectedFile).then((snapshot) => {
										owner.details.organisation_image = selectedFile.name;
										owner.details.organisation_image_path = path;
										this.owners.set(owner.details).then((success) => {
												alert("Profile was created successfully");
												return this.owners;
										});
								});
							}
						});
					}
				}).catch((error) => {
						alert(error.message);
						console.log(error);
						return -1;
					});
  }
employeeSignup(employee){
	var cc:any;
	cc=0;
	this.folder="EmployeeImages";
	this.afAuth.auth.createUserWithEmailAndPassword(employee.details.email, employee.pwdGrp.password1).then((success) => {
	console.log(success);
	console.log(this.afAuth.auth.currentUser.uid);
	this.empsignup = this.afDb.object('/Employees/'+this.afAuth.auth.currentUser.uid) as FirebaseObjectObservable<EmployeeSignupInterface>;
	let storageRef = firebase.storage().ref();
	for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_employee')).files[0]]){
		let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
		let iRef = storageRef.child(path);
		iRef.put(selectedFile).then((snapshot) => {
			employee.details.image = selectedFile.name;
			employee.details.path = path;
			this.empsignup.set(employee.details).then((success) => {
				this.afDb.object('/AvailableEmps/'+this.afAuth.auth.currentUser.uid+'/name/').set(employee.details.name).then((success) =>{
					alert("Profile was created successfully");
					cc=1;

				}).catch((error) => {
					alert(error.message);
					console.log(error);
					cc= -1;
					});

			}).catch((error) => {
					alert(error.message);
					console.log(error);
					cc= -1;
				});
		});
	}
	}).catch((error) => {
			alert(error.message);
			console.log(error);
			cc=-1;
		});
		return cc;
}

  addEmployee(employee){
  	console.log(this.afAuth.auth.currentUser.uid);
  	var fbApp2 =  firebase2.initializeApp(environment.firebase,"workerApp");
  	var fbAuth2 = fbApp2.auth();
  	var fbDb2 = fbApp2.database();
  	 fbAuth2.createUserWithEmailAndPassword(employee.details.email, employee.pwdGrp.password1).then((firebaseUser) => {
    	console.log("User " + firebaseUser.uid + " created successfully!");
    	employee.details.manId = this.afAuth.auth.currentUser.uid;
     	fbDb2.ref('/Employees/'+firebaseUser.uid).set(employee.details).then((success) => {
     			fbAuth2.signOut();
				fbApp2.delete();
     	});
     	this.afDb.list('/ManagedEmps').update(this.afAuth.auth.currentUser.uid, {[firebaseUser.uid]:{'name':employee.details.name}})
     	alert("Profile was created successfully");
	});
	console.log(this.afAuth.auth.currentUser.uid);
  }

 updateEmployee(employee){
    this.afDb.object('/Employees/'+this.afAuth.auth.currentUser.uid).update(employee.details).then((success) => {
		console.log(success);
		alert("Profile was updated successfully");
		}).catch((error) => {
			alert(error.message);
			console.log(error);
			});
  }


	updateOwner(owner){
		 this.owners = this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid) as FirebaseObjectObservable<Owner>;

		 let storageRef = firebase.storage().ref();

		 if(((<HTMLInputElement>document.getElementById('image_organisation')).files[0])!=null){
			 for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_organisation')).files[0]]){
				 let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
				 let iRef = storageRef.child(path);
				 iRef.put(selectedFile).then((snapshot) => {
						 owner.orgnaisation_image = selectedFile.name;
						 owner.orgnaisation_image_path = path;
				 });
			 }
		 }

		 if(((<HTMLInputElement>document.getElementById('image_owner')).files[0])!=null){
			 for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_owner')).files[0]]){
				 let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
				 let iRef = storageRef.child(path);
				 iRef.put(selectedFile).then((snapshot) => {
						 owner.image = selectedFile.name;
						 owner.path = path;
				 });
			 }
		 }

		 			console.log(owner);
		     this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid).update(owner);
				 //alert("Your profile is being updated ! Hold On!");
				 return owner;
	 }

	 getJobList(){
     this.listings = this.afDb.list('/Managers') as FirebaseListObservable<Organisation[]>;
     return this.listings;
   }

	getCompanyDetails(id){
		this.job = this.afDb.object('/Managers/'+id) as FirebaseObjectObservable<Organisation>
		return this.job;
	}


	checkJob(id){
		this.listings = this.afDb.list('/StaffingReq') as FirebaseListObservable<jobApply[]>;
		return this.listings;
	}

	applyJob(id){
		this.checkjobapply=[];
		this.addit=1;
		this.afDb.list("/UserReq/"+this.afAuth.auth.currentUser.uid+"/open/").take(1).subscribe(keys => {
		    keys.forEach(key => {
					this.checkjobapply.push(key);
				//console.log(this.checkjobapply.length);
						});
			});
			var that=this;
			var idto=id;
			setTimeout(function () {
				for(var i =0;i<that.checkjobapply.length;i++){
						that.job = that.afDb.object("/StaffingReq/"+that.checkjobapply[i].$key+"/reqInfo");
						that.job.take(1).subscribe(xy =>
							{
								var x =JSON.parse(JSON.stringify(xy));
								if(x.toId==id){
									that.addit=2;
								}else{
								}
							});
							if(that.addit==2){
								break;
							}
						}
    		}, 500);

			setTimeout(function () {
				if(that.addit==1){
					console.log(that.afAuth.auth.currentUser.uid);
					console.log(JSON.stringify({"toId":id,"fromId":that.afAuth.auth.currentUser.uid,"cancelled":"false"}));
					let updateMap = {};
					var postData = {"toId":id,"fromId":that.afAuth.auth.currentUser.uid,"cancelled":"false"};
					var newReqId = firebase.database().ref().child('StaffingReq').push().key;

					updateMap["/StaffingReq/"+ newReqId + "/reqInfo/"] = postData;
					updateMap["/UserReq/"+that.afAuth.auth.currentUser.uid+"/open/"+newReqId+"/"] = "true";

  					firebase.database().ref().update(updateMap).then((success) =>{
  						that.afDb.object('/UserReq/'+id+'/open/'+newReqId+"/").set("true").then((success) =>{
						alert("You have successfully applied for this job");
							}).catch((error) => {
								alert("Job applied but request not sent: "+ error.message);
								console.log(error);
								});
						}).catch((error) => {
							alert(error.message);
							console.log(error);
						});
					}
				else {
					alert("You have already applied for this job");
					return -1;
					}
			}, 1000);
	}


app2(id){
	this.checkjobapply=[];
	this.addit=1;
	this.afDb.list("/Vacancies/"+id+"/applicants/").take(1).subscribe(keys => {
			keys.forEach(key => {
				//this.checkjobapply.push(key);
				if(key.$key==this.afAuth.auth.currentUser.uid){
					this.addit=2;
				}

			//console.log(this.checkjobapply.length);
					});
		});
		var that=this;

		setTimeout(function () {
			if(that.addit==1){

	let updateMap = {};
	updateMap["/Vacancies/"+ id + "/applicants/"+that.afAuth.auth.currentUser.uid] = "true";
	updateMap["/UserReq/"+that.afAuth.auth.currentUser.uid+"/open/"+id] = "true";
		firebase.database().ref().update(updateMap).then((success) =>{
			alert("You have successfully applied for this job");
		}).catch((error) => {
			alert("Job applied but request not sent: "+ error.message);
			console.log(error);
		});
	}else{
		alert("You have already applied for this job");
	}
},500);

}




	employeeApplyJob(id){
		this.checkjobapply=[];
		this.addit=1;
		this.afDb.list("/Vacancies/"+id+"/applicants/").take(1).subscribe(keys => {
				keys.forEach(key => {
					this.checkjobapply.push(key);

				//console.log(this.checkjobapply.length);
						});
			});
			var that=this;
			var idto=id;

			setTimeout(function () {
				for(var i =0;i<that.checkjobapply.length;i++){
						that.job = that.afDb.object("/StaffingReq/"+that.checkjobapply[i].$key+"/reqInfo");
						that.job.take(1).subscribe(xy =>
							{
								var x =JSON.parse(JSON.stringify(xy));
								if(x.toId==id){
									that.addit=2;
								}else{
								}
							});
							if(that.addit==2){
								break;
							}
						}
				}, 500);

			setTimeout(function () {
				if(that.addit==1){
					console.log(that.afAuth.auth.currentUser.uid);
					console.log(JSON.stringify({"toId":id,"fromId":that.afAuth.auth.currentUser.uid,"cancelled":"false"}));
					let updateMap = {};
					var postData = {"toId":id,"fromId":that.afAuth.auth.currentUser.uid,"cancelled":"false"};
					var newReqId = firebase.database().ref().child('StaffingReq').push().key;

					updateMap["/StaffingReq/"+ newReqId + "/reqInfo/"] = postData;
					updateMap["/UserReq/"+that.afAuth.auth.currentUser.uid+"/open/"+newReqId+"/"] = "true";

						firebase.database().ref().update(updateMap).then((success) =>{
							that.afDb.object('/UserReq/'+id+'/open/'+newReqId+"/").set("true").then((success) =>{
						alert("You have successfully applied for this job");
							}).catch((error) => {
								alert("Job applied but request not sent: "+ error.message);
								console.log(error);
								});
						}).catch((error) => {
							alert(error.message);
							console.log(error);
						});
					}
				else {
					alert("You have already applied for this job");
					return -1;
					}
			}, 1000);
	}




	check_if_free_employee(){
		//var x=0;

		return this.afDb.list("/AvailableEmps/"+this.afAuth.auth.currentUser.uid).take(1);


	}
	see_jobs_added(){
		this.checkjobadd=[];
		this.job_array=[];

			this.addit=1;
			return this.afDb.list("/UserReq/"+this.afAuth.auth.currentUser.uid+"/open/");
				/*setTimeout(function () {
					for(var i =0;i<that.checkjobadd.length;i++){
							that.job = that.afDb.object("/Vacancies/"+that.checkjobadd[i].$key+"/vacInfo");
							that.job.take(1).subscribe(xy =>
								{
									that.job_array[i]=xy;


								});

							}
					}, 300); */
					//setTimeout(function () { console.log(this.job_array);return this.job_array;},700);
	}
	see_job_details(key){
		//console.log( this.afDb.object("/Vacancies/"+key+"/vacInfo").take(1));

		return ( this.afDb.object("/Vacancies/"+key+"/vacInfo").take(1));
	}
	addJobRequirements(job_add){
	this.checkjobadd=[];
		this.addit=1;
		this.afDb.list("/UserReq/"+this.afAuth.auth.currentUser.uid+"/open/").take(1).subscribe(keys => {
				keys.forEach(key => {
					this.checkjobadd.push(key);
				console.log(this.checkjobadd.length);
						});
			});
			var that=this;
			setTimeout(function () {
				for(var i =0;i<that.checkjobadd.length;i++){
						that.job = that.afDb.object("/Vacancies/"+that.checkjobadd[i].$key+"/vacInfo");
						that.job.take(1).subscribe(xy =>
							{
								console.log(xy);
								var x =JSON.parse(JSON.stringify(xy));
								if(((x.job_gender==job_add.job_gender))&&((x.job_role)==(job_add.job_role))&&((x.job_address)==(job_add.job_address))){

									that.addit=2;
									//alert((x.gender==job_add.gender)+" "+ (x.job_role==job_add.job_role)+ " "+(x.address==job_add.address));
								}else{
								}
							});
							if(that.addit==2){
								break;
							}
						}
				}, 300);

				setTimeout(function () {
					if(that.addit==1){
						console.log(job_add);
						let updateMap = {};
						//var postData = {"toId":id,"fromId":that.afAuth.auth.currentUser.uid,"cancelled":"false"};
						var newReqId = firebase.database().ref().child('Vacancies').push().key;


						updateMap["/Vacancies/"+ newReqId + "/protectedInfo/manId"] =that.afAuth.auth.currentUser.uid;

							firebase.database().ref().update(updateMap).then((success) =>{
								let updateMap2 = {};

										//updateMap2["/Vacancies/"+ newReqId + "/active/"] ="true";
										updateMap2["/Vacancies/"+ newReqId + "/vacInfo/"] =job_add;
										updateMap2["/UserReq/"+that.afAuth.auth.currentUser.uid+"/open/"+newReqId+"/"] = "true";
										firebase.database().ref().update(updateMap2).then((success) =>{
											alert("You have successfully added the job");

										}).catch((error) => {
											alert(error.message);
											console.log(error);
										});

							}).catch((error) => {
								alert(error.message);
								console.log(error);
							});
						}
					else {
						alert("You have already added this job");
						return -1;
						}
				}, 1000);

	}
	get_entire_job_vacancy(index){
		return this.afDb.object("/Vacancies/"+index);


	}
	delete_job(x,index){
		let updateMap2 = {};

				//updateMap2["/Vacancies/"+ newReqId + "/active/"] ="true";
				updateMap2["/ClosedVacancies/"+ index] =x;
				firebase.database().ref().update(updateMap2).then((success) =>{

					this.afDb.object('/Vacancies/'+index).remove();

					this.afDb.object('/UserReq/'+this.afAuth.auth.currentUser.uid+"/open/"+index).remove();
					this.afDb.object('/UserReq/'+this.afAuth.auth.currentUser.uid+"/closed/"+index).set("true");
					alert("You have successfully deleted the job");
					return 1;


				}).catch((error) => {
					alert(error.message);
					console.log(error);
				});
	}

	delete_appl(vac_uid){
		let updateMap = {};
		updateMap["/Vacancies/"+ vac_uid + "/applicants/"+this.afAuth.auth.currentUser.uid] = null;
		updateMap["/UserReq/"+this.afAuth.auth.currentUser.uid+"/open/"+vac_uid] = null;
		firebase.database().ref().update(updateMap).then((success) =>{
			alert("You have successfully deleted your application for this job");
			return 1;
		}).catch((error) => {
			alert("Job application not deleted: "+ error.message);
			console.log(error);
		});
		return -1;
	}

		showApplicants(id){
			this.checkjobadd=[];
				this.addit=1;
				return this.afDb.list("/Vacancies/"+id+"/applicants/").take(1);
	}


	getVacancies(){
		this.listings = this.afDb.list('/Vacancies') as FirebaseListObservable<Organisation[]>;
		return this.listings;
	}
	showApplicantName(id){
		return this.afDb.object("/AvailableEmps/"+id);
	}
	add_random_key(vac_id,key,emp_id){
		let updateMap2 = {};
				updateMap2["/Vacancies/"+ vac_id + "/result/"+emp_id+"/random_key/"] =key;
				updateMap2["/UserReq/"+emp_id+"/accepted/"+vac_id+"/random_key/"] = key;
				firebase.database().ref().update(updateMap2).then((success) =>{
					alert("You have accepted the request. Enter the employee code to add him.");

				}).catch((error) => {
					alert(error.message);
					console.log(error);
				});

	}
	validate_OTP(vac_id,key,emp_id){
		return this.afDb.object("/Vacancies/"+vac_id+"/result/"+emp_id).take(1);

	}
	accepted_requests_list(){
		return this.afDb.list("/UserReq/"+this.afAuth.auth.currentUser.uid+"/accepted/");
	}
	getManagerId(key){
		return this.afDb.object('/Vacancies/'+key+'/protectedInfo/manId'+"/");
	}
	assign_free_employee(vac_id,emp_id,name){
			this.afDb.list('/ManagedEmps').update(this.afAuth.auth.currentUser.uid, {[emp_id]:{'name':name}}).then((success) =>{
				this.afDb.object('/Employees/'+emp_id+"/").update({'manId':this.afAuth.auth.currentUser.uid});
			}).catch((error) => {
				alert("Error adding employee: "+ error.message);
				console.log(error);
				return;
			});
			this.afDb.object('/AvailableEmps/'+emp_id+"/").remove();
			this.afDb.object('/Vacancies/'+vac_id+"/result/"+emp_id).remove();
			this.afDb.object('/Vacancies/'+vac_id+"/applicants/"+emp_id).remove();
			this.afDb.object('/UserReq/'+emp_id+"/open/"+vac_id).remove();
			this.afDb.object('/UserReq/'+emp_id+"/accepted/"+vac_id).remove();
			this.afDb.object("/Vacancies/"+ vac_id + "/assigned-employees/"+emp_id).set("true");
			this.afDb.object("/UserReq/"+emp_id+"/closed/"+vac_id).set("true");

						alert("You have successfully added the employee to your organisations.");



	}

	setNotify(){
		this.afDb.object('/Employees/'+this.afAuth.auth.currentUser.uid).update({'searchedForJobs':{'notified':true}});
	}

  searchForEmps(location){


  }
	addReviewService(addReviewForm){

	//	var newReqId = firebase.database().ref().child('Reviews').push().key;
	let updateMap = {};
	var postData = {"skills":addReviewForm.value.skills,"hygiene":addReviewForm.value.hygiene,"social":addReviewForm.value.social,"punct":addReviewForm.value.punct,"behav":addReviewForm.value.behav,"comments":addReviewForm.value.comments};
	var newReqId = firebase.database().ref().child('StaffingReq').push().key;

	updateMap["/Reviews/"+ newReqId] = postData;

		firebase.database().ref().update(updateMap).then((success) =>{
			console.log(addReviewForm.value.skills);
		});
		return newReqId;
	}
	addReviewIdToEmployee(employeeId,reviewID){
		this.afDb.object('/Employees/'+employeeId+'/reviews/'+reviewID).set("reviewID");
		return 1;
		//firebase.database().ref().child('Employees').push().key;

	}





}

interface Organisation{

	organisation_name?:string;
	exp?:string;
	num?:string;
	email?:string;

	registration_number?:string;
	organisation_type?:string;
	details?:string;

	image?:any;
	orgnaisation_image_path?:string;
	orgnaisation_image?:any;
	path?:string;
}



interface Owner{
	$key?:string;
	person_name?:string;
	organisation_name?:string;
	exp?:string;
	num?:string;
	email?:string;
	password1?:string;
	password2?:string;
	registration_number?:string;
	organisation_type?:string;
	details?:string;
	isManager?:string;
	image?:any;
	orgnaisation_image_path?:string;
	orgnaisation_image?:any;
	path?:string;
}

interface EmployeeSignupInterface{
	$key?:string;
	name?:string;
	num?:string;
	email?:string;
	password1?:string;
	password2?:string;
	profession_type?:string;
	details?:string;
	isManager?:string;
	image?:any;

	path?:string;
}

interface Employee{
  $key?:string;
  name?: string;
	pos?: string;
	exp?: string;
	num?: string;
	email?: string;
	uid?: string;
	sal?: string;
	loy?: string;
	csa?: string;
	clen?: string;
	act?: string;
	comm?: string;
}

interface ManagedEmp{
  	$key?:string;
  	name?:string;
}
interface addReviewForm{
	skills?: any;
	hygiene?: any;
	social?: any;
	punct?: any;
	behav?: any;
	comments?: any;
}
interface jobApply{
	reqInfo: {
		fromId?: any;
		toId?: any;
	 	cancelled?: string;
	},
	result: {
	 	accepted?: string;
	    rejected?: string;
	}
}
