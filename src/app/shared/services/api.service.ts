import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Project} from '../interfaces/project';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly projectsUrl = '/api/projects/';
  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);

  constructor(
    public http: HttpClient
  ) {
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  public onGetProjects(): void {
    this.getProjects().subscribe((projects: Project[]) => this.projects$.next(projects));
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.projectsUrl}${project._id}`, project);
  }

  public onUpdateProject(project: Project): void {
    this.projects$.next([...this.projects$.value].map(p => p._id === project._id ? project : p));
  }


}
