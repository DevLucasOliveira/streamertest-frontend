import { ProjectStatus } from './../enums/projectStatus';
export class Project{
    id: string;
    name: string;
    image: string;
    why: string;
    what: string;
    whatWillWeDo: string;
    projectStatus: ProjectStatus;
    courseId : string

    constructor(name: string, image: string, why: string, what: string, whatWillWeDo: string, projectStatus: ProjectStatus, courseId: string) {
        this.name = name;
        this.image = image;
        this.why = why;
        this.what = what;
        this.whatWillWeDo = whatWillWeDo;
        this.projectStatus = projectStatus;
        this.courseId = courseId;
    }


}