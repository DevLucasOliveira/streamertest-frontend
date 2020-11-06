import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss']
})
export class DeleteProjectModalComponent implements OnInit {

  @Input() projectId: string;

  constructor(    
    private activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
  }

  dismiss() {
    this.activeModal.close(false);
  }

  confirm() {
    this.projectService.DeleteProject(this.projectId).subscribe(
      (response) => {
        this.toastr.success('Projeto apagado!', 'Sucesso');
        this.activeModal.close();
      },
      (err) => {
        console.error(err);
        this.toastr.error('Não foi possível deletar o projeto', 'Error');
        return;
      });
  }


}
