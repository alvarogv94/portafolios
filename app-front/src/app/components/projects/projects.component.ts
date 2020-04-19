import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

	public projects: Project[];
	public imageUrl: string;

	constructor(
  		private _projectService: ProjectService
	) { 
		this.imageUrl = Global.url + "get-image/";
	}

	ngOnInit() {
		this.getProjects();
	}

	getProjects() {
		this._projectService.getProjects().subscribe(
			response => {
				if(response.proyect) this.projects = response.proyect;
			},
			error => {
				console.log(<any> error);
			}
		);

	}

}
