import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CourseData {
  url: string = 'miun_courses.json'
  
  constructor(private http: HttpClient){}

  getCourse(): Observable<Courses[]>{
    return this.http.get<Courses[]>(this.url)
  }
}
