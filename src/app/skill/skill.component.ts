import {Component} from '@angular/core';

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
  
  constructor() {
    
  }
  
  ngOnInit() {        
    this.getSkills();        
  }
    
  private getSkills(): void {   
    var skillString = JSON.stringify([
      { "id" : 10, "skillname" : "Python, Django", "skilltype" : "web" },
      { "id" : 2, "skillname" : "Angular 9, React, ", "skilltype" : "web" },
      { "id" : 1, "skillname" : "C#.NET, ASP.NET MVC", "skilltype" : "web" },
      { "id" : 3, "skillname" : "CSS, Bootstrap, SCSS, Flex ", "skilltype" : "web" } ]);
    this.webskills = JSON.parse(skillString);
    var skillString2 = JSON.stringify([
      { "id" : 4, "skillname" : "SQL Server, Oracle", "skilltype" : "database" },
      { "id" : 5, "skillname" : "MySQL, mongoDB", "skilltype" : "database" },
      { "id" : 6, "skillname" : "hibernate, JPA", "skilltype" : "database" },          
      { "id" : 8, "skillname" : "EF Core", "skilltype" : "database" } ]);
    this.databaseskills = JSON.parse(skillString2);
    var skillString3 = JSON.stringify( [
      { "id" : 7, "skillname" : ".NET Core 3, Web API", "skilltype" : "service" },
      { "id" : 9, "skillname" : "Java Spring Boot, Java 8/11", "skilltype" : "service" },   
      { "id" : 11, "skillname" : "OpenAPI, Swagger", "skilltype" : "service" },         
      { "id" : 12, "skillname" : "Node, Express", "skilltype" : "service" } ] );
    this.serviceskills = JSON.parse(skillString3);      
       
  }
  
}