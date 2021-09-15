import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from 'src/app/services/screensize.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  isDesktop: boolean;

  constructor(private screensizeService: ScreensizeService) { 
    this.screensizeService.isDesktopView().subscribe( isDesktop => {
      console.log('Is desktop changed: ', isDesktop);
      if(this.isDesktop && !isDesktop){
window.location.reload()
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
  }
  login(){}
}
