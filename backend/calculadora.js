'use strict'


//Lo ponemos desde el 2, por que el primer parámetro es la ruta del archivo completa, no son los parámetros que le pasamos
var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);


console.log("Primer Número: " + numero1);
console.log("Segundi Número: " + numero2);

var plantilla = `
La suma es: ${numero1 + numero2}
La resta es: ${numero1 - numero2}
La multiplicación es: ${numero1 * numero2}
La división es: ${numero1 / numero2}
`;
console.log(plantilla);
console.log("hola mundo nodeJS");