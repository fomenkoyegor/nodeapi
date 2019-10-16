import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {ComponentsModule} from '../../shared/components/components.module';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ProjectsComponent, ProjectComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class HomeModule { }
