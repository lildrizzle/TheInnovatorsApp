import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import{User} from '../models/user.mode'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 user={} as User;
val = true;
 
  constructor(private router: Router,
    private toast: ToastController,
    private fAuth: AngularFireAuth,
    private load: LoadingController,
    private http: HttpClient,
    public _apiService:ApiService
    ) { }

  ngOnInit() {
  }
  
   reg(user: User)
  {
    let data = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      password: this.user.password,
  }
if(this.user.name == "" || this.user.surname == "")
{alert('Please Enter Name with Surname');
this.user.name = '';
this.user.surname = '';
this.user.email = '';
this.user.password = '';
this.val = false;
}
else{
       this._apiService.reg(data).subscribe((res:any) => {
        console.log("SUCCESS ===", res);
      
      alert('SUCCESS: Please go verify your email account!');
       
      
      },(error: any) => {
      alert('Ensure details are accurate or Email already exists');
      console.log("ERROR ===", error);
      this.user.name = '';
this.user.surname = '';
this.user.email = '';
this.user.password = '';
this.val = false;
        })
      }}

  async register(user:User){
    
    
    if(this.validation()){
      let loader = this.load.create({
        message:"Please wait ...."
      })
      await (await loader).present();
     if(this.val = true){
       try{
        await ( await this.fAuth.createUserWithEmailAndPassword(user.email,user.password).then(data=>console.log(data)))
        await ( await this.fAuth.currentUser).sendEmailVerification();
 
        this.router.navigate(['login']); 

      }catch(e){
        if(e.code==='auth/weak-password')
        this.showToast('Password too weak');
        if(e.code==='auth/invalid-email')
        this.showToast('Incorrect email format');
        
        if (e.code === "auth/email-already-exists") 
        this.showToast( "This email is already in use" ); 

      }
    }else{
      alert('Firebase not doing anything');
    }
      await (await loader).dismiss();
    }
  }


  showToast(message:string){
    this.toast.create({
      message: message,
      duration: 4000
    }).then(toastData=>toastData.present())
  }
  login(){}

  validation(){
    if(!this.user.email)
    {
    this.showToast("Enter an email address");
    return false;
    }

    if(!this.user.password)
    {
      this.showToast("Enter a password");
      return false;
      }
      return true;
  }

}
