import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { User, auth } from 'firebase';
import {FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure} from 'firebaseui-angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  userName : String;
  
  myObserver = {
    next: User => this.userName = User.email,
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  constructor(private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(this.myObserver)
  }

  private firebaseAuthChangeListener(response: User) {
    // if needed, do a redirect in here
    if (response) {
     this.userName = response.email;
    } else {
      this.userName = "nema vrijednost";
    }
  }
successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
  this.userName = signInSuccessData.authResult.user.email
}

errorCallback(errorData: FirebaseUISignInFailure) {} 

goBack(){}

}
