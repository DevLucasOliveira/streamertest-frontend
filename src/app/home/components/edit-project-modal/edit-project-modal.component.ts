import { Project } from './../../models/project';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectStatus } from '../../enums/projectStatus';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent implements OnInit {

  public form: FormGroup;
  @Input() project: Project;
  @Input() courseId: string;
  imageSrc : string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadForm(this.project);
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

  private loadForm(project) {
    this.form.controls['name'].setValue(project.name);
    this.form.controls['why'].setValue(project.why);
    this.form.controls['what'].setValue(project.what);
    this.form.controls['whatWillWeDo'].setValue(project.whatWillWeDo);
    this.form.controls['projectStatus'].setValue(project.projectStatus);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public confirm() {
    if (this.form.invalid)
      return;

    let form = this.form.controls;

    this.updateProject(form.name.value, this.imageSrc, form.why.value, form.what.value, form.whatWillWeDo.value, form.projectStatus.value, form.courseId.value);
    this.editProject(this.project);
  }

  updateProject(name: string, image: string, why: string, what: string, whatWillWeDo: string, projectStatus: ProjectStatus, courseId: string){
    this.project.name = name;
    this.project.image = image;
    this.project.why = why;
    this.project.what = what;
    this.project.whatWillWeDo = whatWillWeDo;
    this.project.projectStatus = projectStatus;
    this.project.courseId = courseId;
  }

  private editProject(model: Project) {
    this.projectService.UpdateProject(model.id, model).subscribe(
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
