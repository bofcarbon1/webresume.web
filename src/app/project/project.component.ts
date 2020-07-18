import {
    Directive,
    Inject,
    EventEmitter,
    Output,
    Input,
    Component,
    forwardRef,
    Host
  } from '@angular/core';
import {ProjectService} from './project.service';
    
  @Component({
    selector: `tab`,
    template: `
      <div [hidden]="!isActive">
        <ng-content></ng-content>
      </div>
    `
  })
  export class Tab {
    isActive: boolean;
    @Input()
    public title: string;
    constructor(@Inject(forwardRef(() => Tabs)) @Host() private tabs: Tabs) {
      this.tabs.addTab(this);
    }
  }
  
  @Component({
    selector: 'tabs',
    styles: [
      `
        .tab {
          display: inline-block;
        }
        .tab-header {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tab-header .is-active {
          background-color: #b3ffff;
        }
        .tab-header li {
          display: inline-block;
          cursor: pointer;
          padding: 5px;
          border: 1px solid #ccc;
        }
        .tab-content {
          border: .5px solid #ccc;
          border-top: none;
          padding: 5px;
        }
      `
    ],
    template: `
      <div class="tab">
        <ul class="tab-header">
          <li *ngFor="let tab of tabs; let index = index"
            [class.is-active]="active == index" (click)="select(index)">
            {{tab.title}}
          </li>
        </ul>
        <div>
          <ng-content></ng-content>
        </div>
      </div> 
      `     
  })
  export class Tabs {
    @Output('changed')
    private tabChanged: EventEmitter<Tab> = new EventEmitter<Tab>();
    private tabs: Tab[];
    private active: number;
    constructor(public projectService: ProjectService) {
      this.tabs = [];
      this.active = 0;
    }
    addTab(tab: Tab) {
      if (this.tabs.length === this.active) {
        tab.isActive = true;
      }
      this.tabs.push(tab);
    }
    select(index) {
      this.tabs[this.active].isActive = false;
      this.active = index;
      this.tabs[index].isActive = true;
      this.tabChanged.emit(this.tabs[index]);
    }
  }
  
  @Component({
    selector: 'webresume-service',
    template: `
     
      <div style="border: .5px solid black">
      <tabs (changed)="tabChanged($event)">
        <tab title="Web Applications">
         <table class="table table-bordered">
    <tbody>
      <tr>
        <td>
          <table class="table table-bordered table-striped" >
            <tbody>
             <ng-template ngFor let-project [ngForOf]="allprojects 
             | projecttypefilter : 'web' | sortDscBy : 'year' " >
              <tr>
               <td>
                <span>{{project.name}} -- {{project.year}} -- {{project.note}}</span>
               </td>
              </tr>
             </ng-template>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
        </tab>
        <tab title="Database Applications">
          <table class="table table-bordered table-striped">
    <tbody>
      <tr>
        <td>
          <table class="table table-bordered table-striped">
            <tbody>
             <ng-template ngFor let-project [ngForOf]="allprojects 
             | projecttypefilter : 'database' | sortDscBy : 'year' " >
              <tr>
               <td>
                <span>{{project.name}} -- {{project.year}} -- {{project.note}}</span>
               </td>
              </tr>
             </ng-template>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
        </tab>
        <tab title="Web Services">
         <table class="table table-bordered table-striped">
    <tbody>
      <tr>
        <td>
          <table class="table table-bordered table-striped">
            <tbody>
             <ng-template ngFor let-project [ngForOf]="allprojects 
             | projecttypefilter : 'service' | sortDscBy : 'year' " >
              <tr>
               <td>
                <span>{{project.name}} -- {{project.year}} -- {{project.note}}</span>
               </td>
              </tr>
             </ng-template>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
        </tab>
      </tabs> 
    </div>
    `
    ,
   
  })
  export class WebResumeService {
    projects:string[];
    allprojects:string;
    public myProjects:string;
    tabTitle:string;  
    
    constructor(
      public projectService: ProjectService) {
     
    }
    
    ngOnInit() {
      this.getProjects();
    }
    
    tabChanged(tab) {
      this.projectService.setTabTitle(tab.title);
      this.tabTitle = tab.title;
      this.getProjects();
    }
    
    private getProjects(): void {
        var projectString =  JSON.stringify(  
        [
        { "id" : "2", "name" : "NDOR", "year" : "2016", "note" : "Built site admin tool in .NET, MVC, JQuery Ajax", "type" : "web" },
        { "id" : "3", "name" : "Limelight", "year" : "2016", "note" : "Built check ACH payment  web app using .NET, MVC, JQuery and Ajax ", "type" : "web" },
        { "id" : "4", "name" : "Digital Resume", "year" : "2017", "note" : "Built digital resume database in MongoDB", "type" : "database" },
        { "id" : "5", "name" : "Comcast", "year" : "2016", "note" : "Built marketing database using SQL Server", "type" : "database" },
        { "id" : "6", "name" : "Digital Resume", "year" : "2017", "note" : "Built digital resume with data maintenance services using NodeJS, ExpressJS", "type" : "service" },
        { "id" : "7", "name" : "Limelight Web Design", "year" : "2016", "note" : "Built check ACH payment services using .NET Web API ", "type" : "service" },
        { "id" : "8", "name" : "Digital Resume", "year" : "2017", "note" : "Built digital resume web with maintenance tool SPA using Angular 2 ", "type" : "web" },
        { "id" : "9", "name" : "Dependable Solutions", "year" : "2015", "note" : "Enhanced Product Licensing web app using ASP.NET, with JQuery and Ajax", "type" : "web" },
        { "id" : "10", "name" : "Dependable Solutions", "year" : "2015", "note" : "Enhanced Product Licensing database using SQL Server with Stored Procedures", "type" : "database" },
        { "id" : "11", "name" : "Comcast", "year" : "2016", "note" : "Built Marketing web app using MVC, JQuery and Ajax", "type" : "web" },
        { "id" : "12", "name" : "Thomson Reuters ", "year" : "2017", "note" : "Eikon Fund Views - Funancial tool in Angular SPA - bug fixes", "type" : "web" },
        { "id" : "13", "name" : "Clark County Assessor", "year" : "2011", "note" : "Created a Property Assessment database using SQL Server and Oracle", "type" : "database" },
        { "id" : "14", "name" : "Clark County Assessor", "year" : "2011", "note" : "Created a Property Assessment Appeal web app using NET and JQuery,", "type" : "web" },
        { "id" : "15", "name" : "HP", "year" : "2013", "note" : "Enhanced an e-Commerce web app using .NET, MVC, JavaScript, JQuery, ", "type" : "web" },
        { "id" : "16", "name" : "Limelight Web Design", "year" : "2014", "note" : "Developed a Check and ACH payment web app using .NET, MVC and JQuery", "type" : "web" },
        { "id" : "17", "name" : "Limelight Web Design", "year" : "2014", "note" : "Created an Check and ACH payment database in SQL Server and Oracle", "type" : "database" },
        { "id" : "18", "name" : "Limelight Web Design", "year" : "2015", "note" : "Enhanced IT contract application  WCF and Web API services ", "type" : "service" },
        { "id" : "19", "name" : "DXC", "year" : "2018", "note" : "Enhanced Kansas Medicaid app using  WCF and Web API services ", "type" : "service" },
        { "id" : "20", "name" : "DXC", "year" : "2018", "note" : "Enhanced UI for Medicaid web app using Angular 4 with Node ", "type" : "web" },
        { "id" : "21", "name" : "FiServ", "year" : "2019", "note" : "Enhanced education loan web app using Angular 7", "type" : "web" },
        { "id" : "22", "name" : "FiServ", "year" : "2019", "note" : "Enhanced  education loan SQL Server database ", "type" : "database" },
        { "id" : "23", "name" : "fiServ", "year" : "2019", "note" : "Built .NET Core Web Api services to process education loans ", "type" : "service" },
        { "id" : "24", "name" : "My Work", "year" : "2020", "note" : "Built Python statistical model graphs for web using Django/Angular 9", "type" : "web" },
        { "id" : "25", "name" : "My Work", "year" : "2020", "note" : "Built statistics data source in MySQL database ", "type" : "database" },
        { "id" : "26", "name" : "My Work", "year" : "2020", "note" : "Built Java Spring Boot Api to load/run statitical models with Python, Matplotlib, numpy to SVG", "type" : "service" }  
      ]);
        this.allprojects = JSON.parse(projectString);  
    }    
    
  }