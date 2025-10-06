import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseData } from '../Services/course-data';
import { Courses } from '../models/courses.model';

@Component({
  selector: 'app-courses',
  imports: [CommonModule,],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CourseList {
  courselist = signal<Courses[]>([])                      //Signal som innehåller en lista med course objekt startar en tom array
  searchInput = signal('')                              //signal som lagrar input stringen

  filteredList = computed(()=>{                         //computed som automatiskt uppdateras baserat på söksträng
    const lowercase = this.searchInput().toLowerCase()  
    return this.courselist().filter(course =>
      course.courseCode.toLowerCase().includes(lowercase) ||
      course.courseName.toLowerCase().includes(lowercase) ||
      course.progression.toLowerCase().includes(lowercase)
    )
  })

  sortList(column: keyof Courses){                          //funktion för att sortar listan utifrån en kolumn
    const sorted = [...this.courselist()].sort((a, b) =>   //kopierar listan och sorterar den
      String(a[column]).localeCompare(String(b[column]))                   //sorterar i alfabetisk ordning
    )
    this.courselist.set(sorted)                             //uppdaterar signalen ned den sorterade listan
  }
 
  constructor(private courseservice: CourseData) {}          //hämtar courseservice i constructor

  ngOnInit() {                                              //funktion som kör när component laddas in anropar och hämtar kurser från courseservice och sätter kurslistan i signal
    this.courseservice.getCourse().subscribe(data => {
      this.courselist.set(data);
    })
  }  
}
