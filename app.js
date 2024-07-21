//Aquí estamos interactuando con elementos de HTML a través de JavaScript utilizando el DOM --> Document Model Object

/*Esto es un método
let titulo = document.querySelector('h1');  //El document establece un puente entre index.html y javascript
titulo.innerHTML = 'Adivina el número secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número entre 1 y 10';
*/

/*
Estos métodos los vamos a reemplazar por funciones --> de esta manera, facilitamos y optimizamos el código
PARÁMETRO elemento --> es el elemento HTML a utilizar en la función
PARÁMETRO texto --> es el texto que queremos que se muestre en el elemento
*/
let numeroSecreto = 0;        //Esta variable es global
let intentos = 0;       //Inicializada en 1, porque mínimo habrá 1 intento
let listaNumerosSorteados = [];     //Esta lista almacena con el fin de que no vuelva a sair un número repetido
let numeroMaximo = 10;
let intentosMaximo = 1;     //Comienza en 1 --> máximo 3

function asignarTextoElemento(elemento, texto) {

    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;     //Agregamos el return por ser una buena práctica    || En este caso, la función no retorna nada
    
}

//Declaramos la función intentoDeUsuario
//En HTML llamamos la función que vamos a definirla y declararla en JavaScript | La función es un encapsulamiento de una acción que queremos que haga
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); 

    if (intentos < 3) { 

        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p', `¡Acertaste! Contador: ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es menor');
                
            } else {
                asignarTextoElemento('p', 'El número secreto es mayor');

            }
            intentos++;
            limpiarCaja();      //invocamos la función
        }
        return;
    } else {
        asignarTextoElemento('p', `¡Perdiste! Agotaste el número de intentos`);
    }
}

//Función limpiar caja de texto
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';   //esto es para limpiar la caja, luego invocamos la función en el else de los intentos fallidos para que se limpie automáticamente este falle    
}


//Declaramos la función para generar el número secreto
function generarNumeroSecreto() {
    //let numeroSecreto = Math.floor (Math.random()*10) + 1;      //Esta variable es local --> solo la podemos utilizar dentro de la función | Es independiente a la variable numeroSecreto que se creó por fuera de la función
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;      //Quitamos la variable local de arriba y dejamos nuestro return

    console.log('Número generado: ' + numeroGenerado);

    //El problema del bucle en esta recursividad se puede abordar de distintas maneras --> una puede ser el establecer un máximo de 3 intentos, otra puede ser establecer un máximo de 3 números aleatorios, etc. En este caso, vamos a permitir al usuario el sortear todos los números del 1 al 10
    
    //Si ya sorteamos todos los números, vamos a mostrar un número en la pantalla y cerrar el juego
    if (listaNumerosSorteados.length == numeroMaximo) {
        //Si sí es así, colocamos un mensaje en la pantalla
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');

        //Si no, seguimos jugando
    } else {
        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            //Generamos otro número aleatorio
            return generarNumeroSecreto();     //RECURSIVIDAD: se llama a sí misma
            //Cada vez que se  genera un número existente en la lista entra a la recursividad para llamar un número aleatorio

        } else {
            //Si el número no está incluido en la lista, lo agregamos a la lista y lo devolvemos como resultado de la función
            listaNumerosSorteados.push(numeroGenerado);
            console.log('Lista de números sorteados: ' + listaNumerosSorteados);

            return numeroGenerado;
        }
    }
}


//Función para mensajes iniciales
function condicionesIniciales() {
    asignarTextoElemento('h1', '¡Adivina el número secreto!');
    asignarTextoElemento('p', `Indica un número entre 1 y ${numeroMaximo}`);
    //Generar nuevo número aleatorio
    numeroSecreto = generarNumeroSecreto();  
    //Iniciar el contador de intentos
    intentos = 1;

}

function reiniciarJuego() {     //Limpiar caja  |   Indicar mensaje del 1 al 10 |   Generar el número aleatorio |   Inicializar el número de intentos   |   Deshabilitar el botón de nuevo juego
    //Limpiar la caja
    limpiarCaja();

    //Llamamos la función condicionesIniciales
    condicionesIniciales();

    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    
}

condicionesIniciales(); //Se llama afuera para iniciar el juego     |       Se llama en la función reiniciarJuego 