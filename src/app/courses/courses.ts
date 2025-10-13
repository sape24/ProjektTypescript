import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseData } from '../Services/course-data';
import { Courses } from '../models/courses.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Ramschema } from '../Services/ramschema';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CourseList {
  courselist = signal<Courses[]>([])                      //Signal som innehåller en lista med course objekt startar en tom array
  searchInput = signal('')                              //signal som lagrar input stringen
  selectedSubject = signal('')                          //singal för valt ämne i selectboxen
  subjects = signal<string[]>([])                       //signal med unika ämnen

  filteredList = computed(()=>{                         //computed som automatiskt uppdateras baserat på söksträng och valt ämne
    const lowercase = this.searchInput().toLowerCase()  
    const selected = this.selectedSubject()
    
    return this.courselist().filter(course => {
    const filtersearch =
      course.courseCode.toLowerCase().includes(lowercase) ||
      course.courseName.toLowerCase().includes(lowercase) ||
      course.subjectCode.toLowerCase().includes(lowercase) 
      
      const filtersubject = selected ? course.subject === selected : true
      
      return filtersearch && filtersubject
  })
  })

  sortList(column: keyof Courses){                          //funktion för att sortar listan utifrån en kolumn
    const sorted = [...this.courselist()].sort((a, b) =>   //kopierar listan och sorterar den
      String(a[column]).localeCompare(String(b[column]))                   //sorterar i alfabetisk ordning
    )
    this.courselist.set(sorted)                             //uppdaterar signalen ned den sorterade listan
  }
 
  constructor(private courseservice: CourseData, private ramschema: Ramschema) {}          //hämtar courseservice och ramschema i constructor

  ngOnInit() {                                              //funktion som kör när component laddas in anropar och hämtar kurser från courseservice och sätter kurslistan i signal
    this.courseservice.getCourse().subscribe(data => {
      this.courselist.set(data);
      const uniqueSubjects = [... new Set(data.map(course => course.subject))]
      this.subjects.set(uniqueSubjects)
    })
  }
  
  addToSchedule(course: Courses){                          //lägger till kurs i ramschema genom ramschema service
    this.ramschema.addCourse(course)
  }

  isInSchedule(code:string): boolean{                                   //kontrollerar om kurs redan finns i ramschemat
    return this.ramschema.getSchedule().some(course => course.courseCode === code)
  }
}
