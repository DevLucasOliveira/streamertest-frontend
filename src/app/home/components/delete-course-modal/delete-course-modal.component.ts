import { CourseService } from './../../services/course.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-course-modal',
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.scss']
})
export class DeleteCourseModalComponent implements OnInit {

  @Input() courseId: string;

  constructor(    
    private activeModal: NgbActiveModal,
    private courseService: CourseService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
  }

  dismiss() {
    this.activeModal.close(false);
  }

  confirm() {
    debugger;
    this.courseService.DeleteCourse(this.courseId).subscribe(
      (response) => {
        this.toastr.success('Curso apagado!', 'Sucesso');
        this.activeModal.close();
      },
      (err) => {
        console.error(err);
        this.toastr.error('Não foi possível deletar o curso', 'Error');
        return;
      });
  }

}
