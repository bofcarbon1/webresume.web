import {Component, Inject} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {APP_BASE_HREF, 
  LocationStrategy, 
  HashLocationStrategy} from '@angular/common';
import {WRService} from './webresume.service';

@Component({
  selector: 'webresume-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  sitelinks:string;
  services:string;
  repositorylinks:string[];
  name:string;
  title:string;
  phone:string;
  email:string;
  public myPersonals:string;
  public myEmail:string;
  public mySiteLinks:string;
  public myServices:string;
  
  constructor(public wrservice : WRService) {
    this.repositorylinks = ["Github", "Microsoft Thing"];
  }
  
  ngOnInit() {
    this.getAllPersonal();
    this.getEmail();
    this.getSiteLinks();
  }
    
  
  private getAllPersonal(): void {
    this.wrservice
      .GetPersonal()
      .subscribe((data:string) => this.myPersonals = data,
        error => console.log(error),
        () => {
          this.name = this.myPersonals["name"];
          this.title = this.myPersonals["title"];
          this.phone = this.myPersonals["phone"];
          }
       );
  }
  
  private getEmail(): void {
    this.wrservice
      .GetEmail()
      .subscribe((data:string) => this.myEmail = data,
        error => console.log(error),
        () => {
          this.email = this.myEmail["emailname"] + '@' + this.myEmail["emailsite"] + '.com';
          }
       );
  }
  
  private getSiteLinks(): void {
    this.wrservice
      .GetSiteLinks()
      .subscribe(data => this.mySiteLinks = data,
        error => console.log(error),
        () => {
            this.sitelinks = this.mySiteLinks;
          }
       );
  }
  
  private getServices(): void {
    this.wrservice
      .GetServices()
      .subscribe(data => this.myServices = data,
        error => console.log(error),
        () => {
            this.services = this.myServices;
          }
       );
  }
  
}
