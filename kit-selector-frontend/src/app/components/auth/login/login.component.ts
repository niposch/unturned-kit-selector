import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {collection} from "@angular/fire/firestore";
import {UserProfile} from "../../../models/UserProfile";
import auth = firebase.auth;
import {MatSnackBar} from "@angular/material/snack-bar";
import User = firebase.User;
import {provideFirebaseApp} from "@angular/fire/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private userProfilesCollection: AngularFirestoreCollection<UserProfile>;
  userProfile: UserProfile | null | undefined = undefined;

  constructor(public auth: AngularFireAuth, private readonly db:AngularFirestore,
              private readonly snackbarService: MatSnackBar) {
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        if(res.user == null)
          return;
        this.userProfilesCollection.doc(res.user.uid).get().subscribe(pr => {
          let profile = pr.data()
          if(profile == null){
            profile = {UserName: res.user!.displayName}
            this.userProfilesCollection.doc(res.user!.uid).set(profile);
          }
          this.userProfile = profile
        })
      }, err => console.log(err));
  }
  logout() {
    this.auth.signOut();
  }

  ngOnInit(): void {
    this.userProfilesCollection = this.db.collection<UserProfile>("userprofiles");
    this.auth.user.subscribe(user => {
      if(user == null){
        this.userProfile = {UserName: ""};
        return
      }
      this.userProfilesCollection.doc<UserProfile>(user.uid).get().subscribe(profile => {
        this.userProfile = profile.data()
      })
    })
  }

  updateProfile() {
    this.auth.user.subscribe(user => {
      if(user == null || this.userProfile == null){
        return;
      }
      this.userProfile.UserName = this.userProfile.UserName?.replace(" ", "")??null
      if(this.userProfile.UserName == "")
        this.userProfile.UserName = null
      this.userProfilesCollection.doc(user.uid).set(this.userProfile).then(() =>
        this.snackbarService.open("Changes saved!", "Close", {duration:3000})
      )
    })
  }
}
