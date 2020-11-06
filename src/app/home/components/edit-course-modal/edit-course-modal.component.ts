import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
  styleUrls: ['./edit-course-modal.component.scss']
})
export class EditCourseModalComponent implements OnInit {

  public form: FormGroup;
  @Input() course: Course;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService,
  ) { }

  public ngOnInit() {
    this.buildForm();
    this.loadForm(this.course);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  private loadForm(course) {
    this.form.controls['name'].setValue(course.name);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public confirm() {
    if (this.form.invalid)
      return;

    this.course.name = this.form.controls.name.value;
    this.editCompanyArea(this.course);
  }

  private editCompanyArea(model: Course) {
    this.courseService.UpdateCourse(model.id, model).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Sucesso');
        this.activeModal.close();
      },
      (err) => {
        this.toastr.error('Não foi possível atualizar o curso', 'Error');
        return;
      });
  }



}
