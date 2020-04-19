import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects';
import { UploadService } from '../../services/upload.service';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['../create/create.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

	public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesUpload: Array<File>;
	public imageUrl: string;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService,
		private _route: ActivatedRoute,
		private _router: Router
	) { 
		this.title = "Editar Proyecto";
		this.imageUrl = Global.url + "get-image/";
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

	onSubmit() {
		this._projectService.updateProject(this.project).subscribe(
			response => {
				if(response.proyect) {

					this.save_project = response.proyect;
					//Subir la imagen
					if(this.filesUpload) {
						var url = Global.url + "upload-image/" + response.proyect._id;
						this._uploadService.makeFileRequest(url, [], this.filesUpload, 'image')
						.then((result:any) => {

							this.status = "success";
						});						
					} else {
						this.status = "success";
					}

				} else {
					console.log("Prueba Response 2");
					this.status = "failed";
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}


	fileChangeEvent(fileInput: any) {

		this.filesUpload = <Array<File>>fileInput.target.files;

		console.log(fileInput);
	}

}
