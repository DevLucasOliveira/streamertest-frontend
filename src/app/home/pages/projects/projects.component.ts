import { DeleteProjectModalComponent } from './../../components/delete-project-modal/delete-project-modal.component';
import { Course } from './../../models/course';
import { Project } from './../../models/project';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectModalComponent } from '../../components/add-project-modal/add-project-modal.component';
import { EditProjectModalComponent } from '../../components/edit-project-modal/edit-project-modal.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public name: string = '';
  public projects: Array<Project>;
  public course: Course;
  public courseId: string;

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectService,
    private courseService: CourseService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getIdOfParams();
    this.getProjectsOfCourse();
  }

  private getIdOfParams() {
    this.route.params.subscribe(
      (params) => {
        this.courseId = params.id;
      });
  }

  private getProjectsOfCourse() {
    this.courseService.GetById(this.courseId).subscribe(
      (response) => {
        this.course = response;
        this.projects = this.course.projects;
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
        return;
      });
  }

  private openModal(modal: any) {
    return this.modalService.open(modal, {
      size: "md",
      centered: false,
      backdrop: true,
      backdropClass: "modal-backdrop"
    });
  }


  public addProject(){
    var modalRef = this.openModal(AddProjectModalComponent);
    modalRef.componentInstance.courseId = this.courseId;
    
    modalRef.result.then(
      (data) => {
        this.getProjectsOfCourse();
      },
      (err) => {
        return;
      });
  }

  public editProject(project: Project){
    var modalRef = this.openModal(EditProjectModalComponent);
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.courseId = this.courseId;

    modalRef.result.then(
      (data) => {
        this.getProjectsOfCourse();
      },
      (err) => {
        return;
      });
  }

  public deleteProject(id: string){
    var modalRef = this.openModal(DeleteProjectModalComponent);
    modalRef.componentInstance.projectId = id;

    modalRef.result.then(
      (data) => {
        this.getProjectsOfCourse();
      },
      (err) => {
        return;
      });
  }




}
