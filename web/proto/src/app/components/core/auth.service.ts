import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { User } from 'firebase/app';

@Injectable()
export class AuthService {

  authState: User;

  constructor(private afAuth: AngularFireAuth) { 

  	afAuth.authState.subscribe( (auth) => {
  		this.authState = auth;
  	});

  }

  get currentUserObservable(): any {
    return this.afAuth.auth.currentUser
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
}
