const vocales = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
]);

// Variables
let mensaje = '';
let mensajeCopiado = '';
let encriptado = false;

// Función para revisar si una letra es vocal
function esVocal(letra) {
    if (letra.charCodeAt(0) == 97 ||
        letra.charCodeAt(0) == 101 ||
        letra.charCodeAt(0) == 105 ||
        letra.charCodeAt(0) == 111 ||
        letra.charCodeAt(0) == 117) {
        return true;
    }
    return false;
}

// Función para revisar si una letra es consonante o espacio en blanco
function esConsonanteOEspacioEnBlanco(letra) {
    if ((letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122 ||
        letra.charCodeAt(0) == 32) &&
        !(letra.charCodeAt(0) == 97 ||
            letra.charCodeAt(0) == 101 ||
            letra.charCodeAt(0) == 105 ||
            letra.charCodeAt(0) == 111 ||
            letra.charCodeAt(0) == 117)) {
        return true;
    }
    return false;
}

// Función para restringir caracteres en el textarea.
// Sólo acepta letras en minúscula y sin acento y espacio en blanco
function soloLetrasMinusculasYEspacioEnBlanco(elEvento) {
    let evento = elEvento || window.Event || TouchEvent;
    let codigoCaracter = evento.charCode || evento.keyCode;
    if ((codigoCaracter >= 97 && codigoCaracter <= 122) || codigoCaracter == 32) {
        return true;
    }
    return false;
}

// Devuelve la vocal encriptada
function encriptarVocal(vocal) {
    return vocales.get(vocal);
}

// Devuelve la vocal desencriptada
function desencriptarVocal(letras) {
    for (let elemento of vocales.entries()) {
        if (elemento[1] == letras) {
            return elemento[0];
        }
    }
}

// Devuelve el texto encriptado
function mensajeEncriptado(texto) {
    let encriptar = '';
    for (let index = 0; index < texto.length; index++) {
        if (esVocal(texto[index])) {
            encriptar += encriptarVocal(texto[index]);
        } else {
            if (esConsonanteOEspacioEnBlanco(texto[index])) {
                encriptar += texto[index];
            }
        }
    }
    return encriptar;
}

// Devuelve el texto desencriptado
function mensajeDesencriptado(texto) {
    let desencriptar = texto;
    for (let elemento of vocales.entries()) {
        desencriptar = desencriptar.replaceAll(elemento[1], elemento[0]);
    }
    return desencriptar;
}

// Función para ocultar o mostrar una etiqueta HTML
function ocultarOMostrarEtiquetaHTML(nombreClase, valorPropiedad) {
    let elementoHTML = document.getElementsByClassName(nombreClase);
    Array.from(elementoHTML).forEach(element => {
        element.style.visibility = valorPropiedad;
    });
}

// Funcion botonEncriptar()
function botonEncriptar() {
    let areaTexto = document.getElementById('text-area');
    if (areaTexto.value.length > 0) {
        let areaTexto2 = document.getElementById('text-area2');
        let parrafo = document.getElementById('texto-encriptar-desencriptar');
        ocultarOMostrarEtiquetaHTML('imagen-parrafo-encript-desencript', 'visible');
        parrafo.innerHTML = 'Texto Encriptado';
        ocultarOMostrarEtiquetaHTML('imagenes', 'hidden');
        areaTexto2.style.visibility = 'visible';
        mensaje = mensajeEncriptado(areaTexto.value);
        areaTexto2.innerHTML = mensaje;
        areaTexto.value = '';
        mensaje = '';
        mensajeCopiado = '';
    }
}

// Funcion botonCopiar()
function botonCopiar() {
    let areaTexto2 = document.getElementById('text-area2');
    if (areaTexto2.value.length > 0) {
        let parrafo = document.getElementById('texto-encriptar-desencriptar');
        parrafo.innerHTML = '';
        ocultarOMostrarEtiquetaHTML('imagen-parrafo-encript-desencript', 'hidden');
        mensajeCopiado = areaTexto2.innerHTML;
        areaTexto2.innerHTML = '';
        ocultarOMostrarEtiquetaHTML('imagenes', 'visible');
        areaTexto2.style.visibility = 'hidden';
        // Copia el contenido al portapapeles, como si fuera un Ctrl + c
        navigator.clipboard.writeText(mensajeCopiado);
    }
}

// Funcion botonDesencriptar()
function botonDesencriptar() {
    let areaTexto = document.getElementById('text-area');
    if (areaTexto.value.length > 0) {
        let areaTexto2 = document.getElementById('text-area2');
        let parrafo = document.getElementById('texto-encriptar-desencriptar');
        ocultarOMostrarEtiquetaHTML('imagen-parrafo-encript-desencript', 'visible');
        parrafo.innerHTML = 'Texto Desencriptado';
        ocultarOMostrarEtiquetaHTML('imagenes', 'hidden');
        areaTexto2.style.visibility = 'visible';
        mensaje = mensajeDesencriptado(areaTexto.value);
        areaTexto2.innerHTML = mensaje;
        areaTexto.value = '';
        mensaje = '';
        mensajeCopiado = '';
    }
}


