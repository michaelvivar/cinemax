import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(private _firebaseAuth: AngularFireAuth) { }

  signInRegular(email, password) {
    //const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);

  }

  signUpRegular(email, password) {
    return this._firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  logout() {
    return this._firebaseAuth.auth.signOut();
  }
}