import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { Courses } from '../models/courses.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Ramschema } from '../Services/ramschema';

@Component({
  selector: 'app-ramschema',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './ramschema.html',
  styleUrl: './ramschema.css'
})
export class RamschemaComponent {
  savedCourses = signal<Courses[]>([])                //signal med listan av sparade kurser

  constructor(private ramschema: Ramschema) {}

  totalPoints = computed(() =>  //räknar ut den totala högskolepoängen för alla valdra kurser
    this.savedCourses().reduce((sum, course) => sum + (Number(course.points) || 0), 0)
  )
  ngOnInit(){              //hämtar sparade kurser från localestorage när komponenete laddas in
    this.savedCourses.set(this.ramschema.getSchedule())
  }

  removeCourse(code: string){         //tar bort en kurs ur ramschemat och uppdaterarlistan
    this.ramschema.removeCourse(code)
    this.savedCourses.set(this.ramschema.getSchedule())
  }
}
