import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent implements OnInit {

  public form: FormGroup;
  @Input() courseId: string;
  imageSrc: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      why: ['', Validators.required],
      what: ['', Validators.required],
      whatWillWeDo: ['', Validators.required],
      projectStatus: ['', Validators.required],
      courseId: [this.courseId],
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public confirm() {
    if (this.form.invalid)
      return;

    let form = this.form.controls;

    let project = new Project(form.name.value, null, form.why.value, form.what.value, form.whatWillWeDo.value, form.projectStatus.value, form.courseId.value);
    this.createProject(project);
  }

  private createProject(model: Project) {
    this.projectService.CreateProject(model).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Sucesso');
        this.activeModal.close();
      },
      (err) => {
        this.toastr.error('Não foi possível cadastrar o projeto', 'Error');
        console.error(err);
        return;
      });
  }


  public picked(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.convert(file);
    }
    else {
      alert('No file selected');
    }
  }

  public convert(files): string {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64Result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.imageSrc = base64Result;
  }


}
