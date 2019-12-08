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
import { WRService } from '../webresume.service';
    
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
          border: 1px solid #ccc;
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
    //providers: [ProjectService] 
  })
  export class Tabs {
    @Output('changed')
    private tabChanged: EventEmitter<Tab> = new EventEmitter<Tab>();
    private tabs: Tab[];
    private active: number;
    constructor(public projectService:ProjectService) {
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
     
      <div style="border: 5px solid black">
      <tabs (changed)="tabChanged($event)">
        <tab title="Web Applications">
         <table class="table table-bordered table-striped">
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
      public projectService:ProjectService,
      public wrservice:WRService) {
     
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
      this.wrservice
        .GetProjects()
        .subscribe(data => this.myProjects = data,
          error => console.log(error),
          () => {
            this.allprojects = this.myProjects;
            }
        );
    }    
    
  }