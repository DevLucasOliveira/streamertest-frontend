import { HttpService } from './../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor( private http: HttpService) { }

  public CreateCourse(model: any): Observable<any> {
    return this.http.post(`courses`, model);
  }

  public GetAll(): Observable<any> {
    return this.http.get(`courses`);
  }

  public GetById(courseId: string): Observable<any> {
    return this.http.get(`courses/${courseId}`);
  }

  public UpdateCourse(courseId: string, model: any): Observable<any> {
    return this.http.put(`courses/${courseId}`, model);
  }

  public DeleteCourse(courseId: string): Observable<any> {
    return this.http.put(`courses/${courseId}`);
  }


}
