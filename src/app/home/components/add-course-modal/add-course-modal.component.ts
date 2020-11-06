import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css']
})
export class AddCourseModalComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public confirm() {
    if (this.form.invalid)
      return;

    let name = this.form.controls.name.value;
    this.createCourse(new Course(name));
  }

  private createCourse(model: Course) {
    this.courseService.CreateCourse(model).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Sucesso');
        this.activeModal.close();
      },
      (err) => {
        this.toastr.error('Não foi possível cadastrar o curso', 'Error');
        console.error(err);
        return;
      });
  }
}
