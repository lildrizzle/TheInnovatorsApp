import { KeyValuePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
headers: HttpHeaders;
//root: String = "https://busanahighschool.co.za/";
root: String= "http://localhost/";
  constructor(
    public  http: HttpClient, private afAuth: AngularFireAuth
  ){
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    
  }
    
  resetPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email)
    .then(() => console.log("We have sent you a password reset link to your email!"))
    .catch(error => console.log(error.message))
     }
  
  reg(data){
    return this.http.post(this.root+'backend/create.php',data);
   
  
  }
  createReq(data){
    return this.http.post(this.root+'backend/createReq.php',data);
  }
  
  insertUser(data){
    return this.http.post(this.root+'backend/userInsert.php',data);
  }
  chatInsert(data){
    return this.http.post(this.root+'backend/chatInsert.php',data);
  }
  chatInserte(data){
    return this.http.post(this.root+'backend/chatInserts.php',data);
  }
  updates(data){
     return this.http.put(this.root+'backend/update.php',data);
  }
  update1(data){
    return this.http.put(this.root+'backend/update1.php',data);
 }
 update2(data){
  return this.http.put(this.root+'backend/update2.php',data);
}
update3(data){
  return this.http.put(this.root+'backend/update3.php',data);
}
update4(data){
  return this.http.put(this.root+'backend/update4.php',data);
}
  getReg(datas){
    return this.http.get(this.root+'backend/getReg.php',datas);
  }
  getUser(data){
    return this.http.post(this.root+'backend/getUser.php', data);
  }
  getRec(data){
    return this.http.post(this.root+'backend/getRec.php', data);
  }
  getResRec(data){
    return this.http.post(this.root+'backend/.php', data);
  }
  guards(data){
    return this.http.post(this.root+'backend/guard.php', data);
  }
  getProfile(data){
    return this.http.post(this.root+'backend/getProfile.php', data);
  }
  getRow(data){
    return this.http.post(this.root+'backend/getRow.php', data);
   
  }
  
  getChat(data){
    return this.http.post(this.root+'backend/getChat.php', data);
   
  }
  getChate(data){
    return this.http.post(this.root+'backend/getChats.php', data);
   
  }
  viewChat(data){
    return this.http.post(this.root+'backend/viewChat.php', data);
   
  }
  
  deleteUser(){
    return this.http.delete(this.root+'backend/deleteUser.php');
  }
  deleteRecord(data){
    return this.http.post(this.root+'backend/deleteRec.php',data);
  }
  deleteResRecord(data){
    return this.http.post(this.root+'backend/delResRec.php',data);
  }
  responseView(data){
    return this.http.post(this.root+'backend/response.php', data);

  }
}
