import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private value :any = '';
  public userArr: any = [];
 public arr:any=[];

 public no:any;
  constructor() { }

  setNo(no){
this.no = no;
  }
  getNo(){
    return this.no;
  }
setV(res){
  this.userArr = res; 
}
  setValue( value)
  {
this.value = value;
  }

  getValue()
  {
   return this.value;
 
  }
  getV()
  {
   return this.userArr;
  }
  getVv()
  {
   return this.userArr;
  }
}
