

import { Component, OnInit } from '@angular/core';

import firebase from "firebase";
import "firebase/firestore";
import {NavController} from "@ionic/angular";



@Component({
  selector: 'app-front',
  templateUrl: './front.page.html',
  styleUrls: ['./front.page.scss'],
})
export class FrontPage implements OnInit {

  uid;
  name;
  username;
  dp;
users = [];

  constructor( public nav : NavController) { 
    this.uid=localStorage.getItem("uid");

  firebase.firestore().collection("chatUsers").doc(this.uid).get().then(userData=>{
    this.name = userData.data()['name'];
    this.username = userData.data()['username'];
    this.dp=userData.data()['dp'];


  });

  firebase.firestore().collection("chatUsers").get().then(userData=>{
    userData.forEach(childData=>{
    //  this.users.push(childData.data());
    if(childData.data()['uid'] != this.uid){
     this.users.push(childData.data()); 
    }
    });
  })
}

  ngOnInit() {
  }
gotoChat(uid,name){
sessionStorage.setItem("uid",uid);
sessionStorage.setItem("name", name);

this.nav.navigateForward("/chat");
}
}
