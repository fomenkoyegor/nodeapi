import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../../../shared/interfaces/project';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects$: Observable<Project[]> = null;

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit() {
    this.onGetProjects();
  }

  public onGetProjects(): void {
    this.api.onGetProjects();
    this.projects$ = this.api.projects$;
  }


}
