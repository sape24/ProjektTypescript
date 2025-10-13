import { Injectable } from '@angular/core';
import { Courses } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class Ramschema {
  private key = 'ramschema'         //nyckel för lagring i localstorage

  getSchedule(): Courses[]{               //hämtar sparade kurser
    return JSON.parse(localStorage.getItem(this.key) || '[]') 
  }

  addCourse(course: Courses): void{          //lägger till ny kurs och kollar ifall det inte är en dublett
    const courses = this.getSchedule()
    const exists = courses.some(courses => courses.courseCode === course.courseCode)

    if (!exists) {
      courses.push(course)
      localStorage.setItem(this.key, JSON.stringify(courses))
    }
  }

  removeCourse(code: string){        //tar bort kurs utifrån kurskod
    const courses = this.getSchedule().filter(course => course.courseCode !== code)
    localStorage.setItem(this.key, JSON.stringify(courses))
  }
}
