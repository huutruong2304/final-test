import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');

 
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        console.log('the route navigated!')
        console.log(event)
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator 
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // console.log(event)
        // Present error to user
        console.log(event.error);
      }
    });
  //  this.getDataService.getAll().subscribe(console.log);

  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  

}
