//Array de objetos button con los botones del panel
let botonesArr = [];
//Número de la máquina que se debe adivinar
let numeroAdivinar;

function play() {
    //La máquina elige un número al azar
    //numeroAdivinar = Math.floor(Math.random() * (100 - 1) + 1);
    numeroAdivinar = Math.floor(Math.random() * (100 - 1) + 1);
    console.log(numeroAdivinar);

    //Construye el panel de botones
    mostrarBotones();

    //Modificamos el botón "Comenzar" por "Reiniciar"
    cambiarComenzarBtn();

    //Borramos mensaje
    document.getElementById("msgInfo").innerText = "Prueba con un número!!";
}
function cambiarComenzarBtn() {
    //Desactivo el botón de "Comenzar"
    let comenzarBtn = document.getElementById("comenzarBtn");

    //Esblecemos el evento onclick
    comenzarBtn.setAttribute("onclick", `play()`);
    //Añadimos los estilos según el CSS vinculado
    comenzarBtn.setAttribute("class", "btn danger");
    //Modificamos el texto por "Reiniciar"
    comenzarBtn.innerText = "Reiniciar Partida";
}
function mostrarBotones() {
    //Borramos todos los elementos del array
    while (botonesArr.length > 0) {
        botonesArr.pop();
    }
    //Crear los botones del panel       
    for (let i = 0; i <= 100; i++) {
        //Creamos un boton
        let btn = crearBoton(i);
        //Añadimos el botón al array de botones
        botonesArr.push(btn);
    }

    let panelBtn = document.getElementById("panelBtn");
    //Borro los botones del panel del HTML
    if (panelBtn.hasChildNodes()) {
        while (panelBtn.childNodes.length >= 1) {
            panelBtn.removeChild(panelBtn.firstChild);
        }
    }
    //Añado los elementos al panel
    for (let i = 1; i < botonesArr.length; i++) {
        panelBtn.appendChild(botonesArr[i]);
        if (i % 10 == 0) {
            panelBtn.appendChild(document.createElement("br"));            
        } 
    }
}

function crearBoton(txtBtn_sinformato) {
    //Añado cero a la izquierda para que todos los números tengan dos dígitos
    let txtBtn = txtBtn_sinformato.toString();
    txtBtn = txtBtn.padStart(2, "0");

    let btn = document.createElement("button");
    //Añadimos los estilos según el CSS vinculado
    btn.setAttribute("class", "btn primary");
    //Establecemos el identificador del boton
    btn.setAttribute("id", `btn_${txtBtn_sinformato}`);
    //Esblecemos el evento onclick
    btn.setAttribute("onclick", `comprobar(${txtBtn})`);
    //Añadimos el texto al boton
    btn.appendChild(document.createTextNode(`${txtBtn}`));

    return btn;

}
function comprobar(numeroJugador) {
    //Que diferencia hay entre el número del jugador y el número a adivinar
    let diferencia = numeroAdivinar - numeroJugador;
    if (diferencia < 0) {
        //Si la diferencia es negativa la paso a positiva
        diferencia = diferencia * -1;
    }
    console.log(`Distancia al número: ${diferencia}`);
    let mensaje = "";
    let variable = "";
    if (diferencia == 0) {
        mensaje = `Bravo!! El número a adivianar era el ${numeroAdivinar}`;
        variable = "btn ganador";
    } else {
        if (diferencia <= 5) {
            mensaje = "Caliente! Casi aciertas!!!"
        } else if (diferencia <= 10) {
            mensaje = "Templado!! Estas cerca!";
        } else if (diferencia <= 15) {
            mensaje = "Frio, frio! "
        } else {
            mensaje = "Muy frío!!!";
        }
        variable = "btn danger";

    }
    let btn = document.getElementById(`btn_${numeroJugador}`);
    if(btn != null) {
        btn.setAttribute('class', variable);
    }
    document.getElementById("msgInfo").innerText = `${mensaje}`;

}