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

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.project.image);
  }

  dismiss() {
    this.activeModal.dismiss();
  }


}
