import {Component} from '@angular/core';
import {WRService} from '../webresume.service';
import { Http, 
    Response, 
    RequestOptions, 
    Headers } from '@angular/http';

@Component({
  selector: 'webresume-skill',
  templateUrl: './skill.component.html'
})
export class WebResumeSkill {
  skilltype:string;
  skillname: string;
  skills: string;
  webskills: string[];
  databaseskills:string;
  serviceskills:string;
  public myServices:string;
  public mySkills: string;
  public myWebSkills:string;
  public myDatabaseSkills:string;
  public myServiceSkills:string;

  services:string;
  
  constructor(public wrservice : WRService) {
    
  }
    ngOnInit() {
   
    this.getServices();    
    this.getSkills();
   
    //this.getDatabaseSkills();  
    //this.getServiceSkills();
   
        
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
  
  private getSkills(): void {   
    this.wrservice
      .GetSkills("web")
      .subscribe(data => this.mySkills = data,
        error => console.log(error),
        () => {
          this.skills = this.mySkills;  
          var skillString = JSON.stringify(this.mySkills);
          var skillParsed = JSON.parse(skillString);
          this.webskills = JSON.parse(skillString)
              .filter(function(item){
                 if (item.skilltype === "web") {
                  return "skillname :" && item.skillname
              }                
          });  
          this.databaseskills = JSON.parse(skillString)
            .filter(function(item){
               if (item.skilltype === "database") {
                return "skillname :" && item.skillname
            }                
          });
          this.serviceskills = JSON.parse(skillString)
          .filter(function(item){
             if (item.skilltype === "service") {
              return "skillname :" && item.skillname
            }                
          });                         
                                  
          }
       );
  }
  
}