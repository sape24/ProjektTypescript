import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CourseData {
  url: string = 'miun_courses.json'              //lokal JSON-fil med kursinformationen
  
  constructor(private http: HttpClient){}

  getCourse(): Observable<Courses[]>{          //hämtar kurslistan som en observable
    return this.http.get<Courses[]>(this.url)
  }
}
