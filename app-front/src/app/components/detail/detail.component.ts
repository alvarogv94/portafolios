import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

	public url: string;
	public project: Project;
	public imageUrl: string;
	public confirm: boolean;

	constructor(
		private _projectService: ProjectService,
		private _router: Router,
		private _route: ActivatedRoute
	) { 
		this.url = Global.url;
		this.project = new Project("","","","",2019,"","");
		this.imageUrl = Global.url + "get-image/";
		this.confirm = false;
	}

	ngOnInit() {
		this._route.params.subscribe(params => {
			//Recogemos el id que nos llega por la url
			let id = params.id;

			this.getProject(id);
		});
	}

	getProject(id) {
		this._projectService.getProject(id).subscribe(
			response => {
				this.project = response.proyect;
			},
			error => {
				console.log(<any> error);
			}
		);
	}

	deleteProject(id) {
		this._projectService.deleteProject(id).subscribe(
			response => {
				if(response.proyect)  this._router.navigate(["/proyectos"]);
			},
			error => {
				console.log(<any> error);
			}
		);
	}

	deleteConfirm(confirm: boolean) {
		this.confirm = confirm;
	}
}
