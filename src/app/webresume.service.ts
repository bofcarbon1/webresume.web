import { Injectable } from '@angular/core';
import { Http, 
    Response, 
    RequestOptions, 
    Headers } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { delay } from "rxjs/operators";
import {Project} from './project/project';

@Injectable()
export class WRService {
    public headers: Headers;
    actionUrlPersonal:string; 
    actionUrlEmail:string;
    actionUrlSiteLinks:string;
    actionUrlServices:string;
    actionUrlSkills:string;
    actionUrlProjects:string;
    actionUrlProject:string;
    actionUrlnewProject:string;
    actionUrlupdProject:string;
    skilltype:string;
    projectID:string;
    
    constructor(private http: Http) {
        this.actionUrlPersonal =
            'https://fierce-brook-76319.herokuapp.com/api/resume/personal';
        this.actionUrlEmail =
            'https://fierce-brook-76319.herokuapp.com/api/resume/email';
        this.actionUrlSiteLinks =
            'https://fierce-brook-76319.herokuapp.com/api/resume/sitelinks';
        this.actionUrlServices =
            'https://fierce-brook-76319.herokuapp.com/api/resume/services';
        this.actionUrlSkills =
            'https://fierce-brook-76319.herokuapp.com/api/resume/skills?skilltype=';
        this.actionUrlProjects =
            'https://fierce-brook-76319.herokuapp.com/api/resume/projects';
        this.actionUrlProject =
            'https://fierce-brook-76319.herokuapp.com/api/resume/project?projectID=';
        this.actionUrlnewProject =
            'https://fierce-brook-76319.herokuapp.com/api/resume/newProject?name=';
        this.actionUrlupdProject =
            'https://fierce-brook-76319.herokuapp.com/api/resume/updProject?id=';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        let proj = new Project();
    }
    
    public GetPersonal = (): Observable<string> => {
        return this.http.get(this.actionUrlPersonal)
            .map((response: Response) => <string>response.json())
            .catch(this.handleError);
            
    }
    
    public GetEmail = (): Observable<string> => {
        return this.http.get(this.actionUrlEmail)
            .map((response: Response) => <string>response.json())
            .catch(this.handleError);
    }
    
    public GetSiteLinks = (): Observable<any> => {
        return this.http.get(this.actionUrlSiteLinks)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetServices = (): Observable<any> => {
        return this.http.get(this.actionUrlServices)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkills = (skilltype): Observable<any> => {
        return this.http.get(this.actionUrlSkills)
            .map(response => response.json())            
            .catch(this.handleError);
    }

    public GetSkillsByType = (skilltype): Observable<any> => {
        return this.http.get(this.actionUrlSkills + skilltype)
            .map(response => response.json())
            .pipe(delay(500))
            .catch(this.handleError);
    }
    
    public GetProjects = (): Observable<any> => {
        return this.http.get(this.actionUrlProjects)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetProject = (projectID): Observable<any> => {
        return this.http.get(this.actionUrlProject + projectID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddProject = (proj): Observable<any> => {
        let params = 
        proj.name + '&year=' + proj.year + '&note=' + proj.note + '&type=' + proj.type;
        return this.http.get(this.actionUrlnewProject + params)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdProject = (projectID, proj): Observable<any> => {
        let params2 = 
        projectID + '&name=' + proj.name + '&year=' + proj.year + '&note=' + proj.note + '&type=' + proj.type;
        //console.log("params2: ", params2);
        return this.http.get(this.actionUrlupdProject + params2)
            .map(response => response.json())
            .catch(this.handleError);
    }    
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');       
    }

}