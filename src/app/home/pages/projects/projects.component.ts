import { Project } from './../../models/project';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public name: string = '';
  public projects: Array<Project>;

  constructor(
    private projectService: ProjectService,
    private courseService: CourseService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getIdOfParams();
  }

  private getIdOfParams() {
    this.route.params.subscribe(
      (params) => {
        this.getProjectsOfCourse(params.id);
      });
  }

  private getProjectsOfCourse(id: string) {
    this.courseService.GetById(id).subscribe(
      (response) => {
        console.log(response);
        this.projects = response;
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
        return;
      });
  }

}
