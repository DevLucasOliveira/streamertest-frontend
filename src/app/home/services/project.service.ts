import { HttpService } from './../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpService) { }

  public CreateProject(model: any): Observable<any> {
    return this.http.post(`projects`, model);
  }

  public GetById(projectId: string): Observable<any> {
    return this.http.get(`projects/${projectId}`);
  }

  public UpdateProject(projectId: string, model: any): Observable<any> {
    return this.http.put(`projects/${projectId}`, model);
  }

  public DeleteProject(projectId: string): Observable<any> {
    return this.http.put(`projects/${projectId}`);
  }


}
