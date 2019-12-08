import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Project } from '../project/project';

@Pipe({
    name: 'projecttypefilter',
    pure: true
})

@Injectable()
export class ProjectTypeFilterPipe implements PipeTransform {
    transform(projects: Project[], [tabtypechar]): any {
        if (!projects) return []; 
        var tabtype = "";
        if (tabtypechar == 'w') tabtype = 'web';
        if (tabtypechar == 'd') tabtype = 'database';
        if (tabtypechar == 's') tabtype = 'service';
        return projects.filter(project => 
        project.type.toLowerCase() === tabtype);
    }
}