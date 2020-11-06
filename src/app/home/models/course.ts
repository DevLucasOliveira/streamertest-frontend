import { Project } from './project';
export class Course{
    id: string;
    name: string;
    projects: Array<Project>;

    constructor(name: string) {
        this.name = name;        
    }
}