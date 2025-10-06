import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseList } from './courses';

describe('Courses', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
