import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/projects';
import { UploadService } from '../../services/upload.service';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

	public title: string;
	public project: Project;
	public save_project;
	public status: string;
	public filesUpload: Array<File>;
	public imageUrl: string;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService
	) { 
		this.title = "Crear Proyecto";
		this.project = new Project("","","","",2019,"","");
		this.imageUrl = Global.url + "get-image/";
	}

	ngOnInit() {
	}

	onSubmit(form) {

		//Llamamos al método que guarda los proyectos, y el método subscribe nos devolverá lo que nos devuelva el método
		this._projectService.saveProject(this.project).subscribe(
			response => {
				console.log("response OK");
				if(response.proyect) {
						
					this.save_project = response.proyect;
					if(this.filesUpload) {
						//Subir la imagen
						var url = Global.url + "upload-image/" + response.proyect._id;
						this.save_project = response.proyect;
						this._uploadService.makeFileRequest(url, [], this.filesUpload, 'image')
						.then((result:any) => {

							this.status = "success";
							form.reset();
						});
					} else {
						this.status = "success";
						form.reset();						
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