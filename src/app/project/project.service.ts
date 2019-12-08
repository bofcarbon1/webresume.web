import {Injectable} from '@angular/core';

@Injectable()
export class ProjectService {
    
    //Set and get active project tab title
    tabTitle:string;
    constructor() {
        this.tabTitle = "Web Development";
    }
    
    setTabTitle(newTabTitle : string) {
        this.tabTitle = newTabTitle;
    }
    
    getTabTitle() {
        return this.tabTitle;
    }   
    
}