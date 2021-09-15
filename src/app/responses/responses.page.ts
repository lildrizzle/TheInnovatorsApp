import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.page.html',
  styleUrls: ['./responses.page.scss'],
})
export class ResponsesPage implements OnInit {
storeUsers:any;
  nums: any;
  constructor(private _apiService: ApiService,private cookie: CookieService,private router: Router) { }

  ngOnInit() {
  }
  responses()
  {
    let data = {
      
      email: this.cookie.get("sessionEmail"),
    }
    this._apiService.responseView(data).subscribe((res:any) => {
     console.log("responses display SUCCESS ===", res);
   this.storeUsers = res;
   console.log("storeUsers", this.storeUsers);
   alert('responses display SUCCESS');
   
   },(error: any) => {
   
   console.log("ERROR ===", error);
     })
   }
   goChat(index){
    let navigatationExtras: NavigationExtras ={
      queryParams:{
        n: this.nums
      }
      }
      this.router.navigate(['chats'], navigatationExtras)
  }
  getVal(index){
    
     this.nums = index+1;
      
      
    
    }
}
