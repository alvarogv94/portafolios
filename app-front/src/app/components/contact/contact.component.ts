import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	public send: string;
	public variablePadre: any;
	@ViewChild("textos", {static: true}) textos;

	constructor() { }

	ngOnInit() {
		console.log(this.textos);
		console.log(this.textos.nativeElement.textContent);
	}


	emiteDatos(event) {
		console.log("Padre: " + event);
		this.variablePadre = event;
		console.log(this.variablePadre);
	}

}
