import { Project } from './../../models/project';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-project-modal',
  templateUrl: './details-project-modal.component.html',
  styleUrls: ['./details-project-modal.component.scss']
})
export class DetailsProjectModalComponent implements OnInit {

  @Input() project: Project;
  status: string;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.verifyStatus();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  verifyStatus() {
    this.status = this.project.projectStatus == 0 ? "Desenvolvimento" : "Publicado";
  }


}
