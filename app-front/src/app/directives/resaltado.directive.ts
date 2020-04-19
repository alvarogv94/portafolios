import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

	constructor(el: ElementRef) { 
  		//Aquí almacenamos el objeto
  		console.log("Directiva => " , el.nativeElement);
	}

}
