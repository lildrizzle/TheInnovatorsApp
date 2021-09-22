import { KeyValuePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
headers: HttpHeaders;

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
    return this.http.post('http://localhost/TheInnovatorsApp/backend/create.php',data);
   
  
  }
  createReq(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/createReq.php',data);
  }
  
  insertUser(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/userInsert.php',data);
  }
  chatInsert(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/chatInsert.php',data);
  }
  chatInserte(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/chatInserts.php',data);
  }
  updates(data){
     return this.http.put('http://localhost/TheInnovatorsApp/backend/update.php',data);
  }
  update1(data){
    return this.http.put('http://localhost/TheInnovatorsApp/backend/update1.php',data);
 }
 update2(data){
  return this.http.put('http://localhost/TheInnovatorsApp/backend/update2.php',data);
}
update3(data){
  return this.http.put('http://localhost/TheInnovatorsApp/backend/update3.php',data);
}
update4(data){
  return this.http.put('http://localhost/TheInnovatorsApp/backend/update4.php',data);
}
  getReg(){
    return this.http.get('http://localhost/TheInnovatorsApp/backend/getReg.php');
  }
  getUser(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getUser.php', data);
  }
  getRec(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getRec.php', data);
  }
  guards(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/guard.php', data);
  }
  getProfile(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getProfile.php', data);
  }
  getRow(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getRow.php', data);
   
  }
  getLine(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getLine.php', data);
   
  }
  getChat(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getChat.php', data);
   
  }
  getChate(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/getChats.php', data);
   
  }
  viewChat(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/viewChat.php', data);
   
  }
  deleteStudent(id){
    return this.http.delete('http://localhost/backend/delete.php?id='+id);
  }
  getStudent(id){
    return this.http.get('http://localhost/projects/php-crud/backend/getSingleStudent.php?id='+id);
  }
  updateStudent(id, data){
    return this.http.put('http://localhost/backend/updateStudent.php?id='+id,data);
  }
  deleteUser(){
    return this.http.delete('http://localhost/TheInnovatorsApp/backend/deleteUser.php');
  }
  deleteRecord(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/deleteRec.php',data);
  }
  responseView(data){
    return this.http.post('http://localhost/TheInnovatorsApp/backend/response.php', data);

  }
}
