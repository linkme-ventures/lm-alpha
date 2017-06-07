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
	managedEmps: FirebaseListObservable<any[]>;
	displEmp: FirebaseObjectObservable<any>;
	displOwn: FirebaseObjectObservable<any>;
	folder:any;
	image1:any;



  constructor(private afDb: AngularFireDatabase, public afAuth: AngularFireAuth) {
		this.folder="OwnerImages";

  }

  getAllEmployees(){
  	this.managedEmps = this.afDb.list('/ManagedEmps/'+this.afAuth.auth.currentUser.uid) as FirebaseListObservable<ManagedEmp[]>;
  	return this.managedEmps;
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
					this.afAuth.auth.createUserWithEmailAndPassword(owner.email, owner.password1).then((success) => {
					console.log(success);
					console.log(this.afAuth.auth.currentUser.uid);
					this.owners = this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid) as FirebaseObjectObservable<Owner>;
					let storageRef = firebase.storage().ref();
					for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_owner')).files[0]]){
						let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
						let iRef = storageRef.child(path);
						iRef.put(selectedFile).then((snapshot) => {
							owner.image = selectedFile.name;
							owner.path = path;
							for(let selectedFile of [(<HTMLInputElement>document.getElementById('image_organisation')).files[0]]){
								let path = `/${this.folder}/${this.afAuth.auth.currentUser.uid}/${selectedFile.name}`;
								let iRef = storageRef.child(path);
								iRef.put(selectedFile).then((snapshot) => {
										owner.orgnaisation_image = selectedFile.name;
										owner.orgnaisation_image_path = path;
										this.owners.set(owner).then((success) => {
												this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid+'/password1').remove();
													this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid+'/password2').remove();
												alert("Profile was created successfully");
										});
								});
							}
						});
					}
				}).catch((error) => {
						alert(error.message);
						console.log(error);
					});
  }

  addEmployee(employee){
  	console.log(this.afAuth.auth.currentUser.uid);
  	var fbApp2 =  firebase2.initializeApp(environment.firebase,"workerApp");
  	var fbAuth2 = fbApp2.auth();
  	var fbDb2 = fbApp2.database();

  	 fbAuth2.createUserWithEmailAndPassword(employee.email, "Welcome123").then((firebaseUser) => {
    	console.log("User " + firebaseUser.uid + " created successfully!");
     	fbDb2.ref('/Employees/'+firebaseUser.uid).set(employee).then((success) => {
     			fbAuth2.signOut();
				fbApp2.delete();
     	});
     	this.afDb.list('/ManagedEmps').update(this.afAuth.auth.currentUser.uid, {[firebaseUser.uid]:{'name':employee.name}})
	});
	console.log(this.afAuth.auth.currentUser.uid);
  }

 updateEmployee(employee){
    this.afDb.object('/Employees/'+this.afAuth.auth.currentUser.uid).update(employee);
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
						// setTimeout('', 3000);
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

					//alert("yes");
		     this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid).update(owner);
				 this.afDb.object('/Managers/'+this.afAuth.auth.currentUser.uid).update(owner);
				 return owner;
				 //this.afDb.list('/Managers/').update(this.afAuth.auth.currentUser.uid, {[firebaseUser.uid]:{'path':owner.path}})
	 }



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
