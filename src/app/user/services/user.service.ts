import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(private _firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  signInRegular(email, password) {
    //const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);

  }

  signUpRegular(email, password) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    //return this._firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  addUser(data) {
    if (data.additionalUserInfo.isNewUser) {
      this.firestore.collection('users').doc(data.user.uid).set({
        provider: data.additionalUserInfo.providerId,
        type: 'user'
      })
    }
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

  get(id: any) {
    return this.firestore.collection('users').doc(id).ref.get();
  }
}