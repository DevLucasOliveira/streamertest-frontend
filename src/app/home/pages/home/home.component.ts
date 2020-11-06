import { DeleteCourseModalComponent } from './../../components/delete-course-modal/delete-course-modal.component';
import { AddCourseModalComponent } from './../../components/add-course-modal/add-course-modal.component';
import { Course } from './../../models/course';
import { CourseService } from '../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EditCourseModalComponent } from '../../components/edit-course-modal/edit-course-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public name: string = '';
  public courses: Array<Course>;

  constructor(
    private modalService: NgbModal,
    private courseService: CourseService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCourses();
  }

  private openModal(modal: any) {
    return this.modalService.open(modal, {
      size: "md",
      centered: false,
      backdrop: true,
      backdropClass: "modal-backdrop"
    });
  }

  private getCourses(){
    this.courseService.GetAll().subscribe(
      (response) => {
        this.courses = response;
      },
      (err) => {
        console.error(err);
        this.toastr.error('Ocorreu um erro interno', 'Error');
        return;
      });
  }

  public addCourse(){
    var modalRef = this.openModal(AddCourseModalComponent);

    modalRef.result.then(
      (data) => {
        this.getCourses();
      },
      (err) => {
        return;
      });
  }

  public editCourse(course: Course){
    var modalRef = this.openModal(EditCourseModalComponent);
    modalRef.componentInstance.course = course;

    modalRef.result.then(
      (data) => {
        this.getCourses();
      },
      (err) => {
        return;
      });
  }

  public manageCourse(id: string){
    this.router.navigate([`curso/${id}`]);
  }

  public deleteCourse(id: string){
    var modalRef = this.openModal(DeleteCourseModalComponent);
    modalRef.componentInstance.courseId = id;

    modalRef.result.then(
      (data) => {
        this.getCourses();
      },
      (err) => {
        return;
      });
  }

}
