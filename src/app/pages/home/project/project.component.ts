import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../shared/interfaces/project';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  public isEdit: boolean;
  newName: string;

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit() {
  }

  public onEdit() {
    this.isEdit = true;
    this.newName = this.project.name;
  }

  onSubmit() {
    this.api.updateProject({_id: this.project._id, name: this.newName})
      .subscribe(project => {
          if (project) {
            this.api.onUpdateProject(project);
            this.onCancel();
          }
        },
        error => {
          console.log(error);
          console.log(error.error.name);
        });
  }

  onCancel() {
    this.isEdit = false;
    this.newName = '';
  }
}
