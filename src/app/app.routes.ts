import { Routes } from '@angular/router';
import { CourseList } from './courses/courses';
import { Ramschema } from './ramschema/ramschema';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {path: 'courses', component: CourseList},
    {path: 'ramschema', component: Ramschema},
    {path: '', redirectTo:'/courses', pathMatch:'full'},
    {path: '404', component: NotFound},
    {path: '**', component: NotFound}
];
