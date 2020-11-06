import { DeleteCourseModalComponent } from './components/delete-course-modal/delete-course-modal.component';
import { DeleteProjectModalComponent } from './components/delete-project-modal/delete-project-modal.component';
import { EditProjectModalComponent } from './components/edit-project-modal/edit-project-modal.component';
import { EditCourseModalComponent } from './components/edit-course-modal/edit-course-modal.component';
import { AddProjectModalComponent } from './components/add-project-modal/add-project-modal.component';
import { AddCourseModalComponent } from './components/add-course-modal/add-course-modal.component';
import { ProjectService } from './services/project.service';
import { CourseService } from './services/course.service';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    NgbModule
  ],
  providers: [CourseService, ProjectService],
  declarations: [
    HomeComponent, 
    ProjectsComponent, 
    AddCourseModalComponent, 
    EditCourseModalComponent, 
    AddProjectModalComponent, 
    EditProjectModalComponent,
    DeleteProjectModalComponent,
    DeleteCourseModalComponent]
})
export class HomeModule { }
