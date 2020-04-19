import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/projects';
import { Global } from './global';

@Injectable()
export class ProjectService {

	public url: string;

	constructor(
		private _http: HttpClient
	) {

		this.url = Global.url;
	}


	testService() {
		return "Test Service";
	}

	saveProject(project: Project): Observable<any> {

		//Los parametros que vamos a enviar, lo convertimos a JSON para que el API pueda capturarlos
		let params = JSON.stringify(project);
		console.log("Objeto project=> " + project);
		console.log("Parámetros => " + params);

		//Definimos las cabeceras, como se va a enviar el contenido, y la información navegará en ese formato
		let headers = new HttpHeaders().set("Content-Type","application/json");

		//Url de la ruta del metodo que vamos a utilizar, parametros que va a guardar y cabeceras
		return this._http.post(this.url + "save-proyect",params,{headers: headers});

	}

	getProjects(): Observable<any> {

		//Definimos las cabeceras, como se va a enviar el contenido, y la información navegará en ese formato
		let headers = new HttpHeaders().set("Content-Type","application/json");

		return this._http.get(this.url + "get-proyects",{headers: headers});

	}

	getProject(id): Observable<any> {

		//Definimos las cabeceras, como se va a enviar el contenido, y la información navegará en ese formato
		let headers = new HttpHeaders().set("Content-Type","application/json");

		return this._http.get(this.url + "get-proyect/" + id,{headers: headers});
	}

	deleteProject(id): Observable<any> {

		//Definimos las cabeceras, como se va a enviar el contenido, y la información navegará en ese formato
		let headers = new HttpHeaders().set("Content-Type","application/json");

		return this._http.delete(this.url + "delete-proyect/" + id,{headers: headers});
	}

	updateProject(project): Observable<any> {

		let params = JSON.stringify(project);

		//Definimos las cabeceras, como se va a enviar el contenido, y la información navegará en ese formato
		let headers = new HttpHeaders().set("Content-Type","application/json");

		return this._http.put(this.url + "update-proyect/" + project._id, params, {headers: headers});

	}
}