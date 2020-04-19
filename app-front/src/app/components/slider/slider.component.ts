import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

	@Input() send: string;
	@Output() lanzaEmite = new EventEmitter();
	public variableHijo: any;

	constructor() { 
		this.variableHijo = {
			nombre: "Nombre",
			apellidos: "Apellidos"
		};	
	}

	ngOnInit() {
  	}

  	lanzaEmitter(event) {
  		console.log("Hijo: " + event);
  		this.lanzaEmite.emit(this.variableHijo);
  	}

}
