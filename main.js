console.log("Hola")

const cuadroUno = document.querySelector("#cuadro-1")
const cuadroDos = document.querySelector("#cuadro-2")
const cuadroTres = document.querySelector("#cuadro-3")
const cuadroCuatro = document.querySelector("#cuadro-4")
const $cuadro = document.querySelectorAll(".cuadro")

cuadroUno.onclick = function(){
    console.log("Apretaste el A! (rojo)")
}

cuadroDos.onclick = function(){
    console.log("Apretaste el B! (azul)")
}

cuadroTres.onclick = function(){
    console.log("Apretaste el C! (amarillo)")
}

cuadroCuatro.onclick = function(){
    console.log("Apretaste el D! (verde)")
}

const botonEmpezar = document.querySelector("#boton")
const estadoJuego = document.querySelector("#estadojuego")

let secuenciaMaquina = []
let secuenciaUsuario = []
let ronda = 0
//bloquearInputUsuario()

botonEmpezar.onclick = comenzarJuego

function comenzarJuego(){
    reiniciarEstado()
    manejarRonda()
    
}

function manejarRonda(){
    actualizarEstado("Turno de la maquina")
    bloquearInputUsuario()
    
    
    const $nuevocuadro = obtenerCuadroAleatorio()
    secuenciaMaquina.push($nuevocuadro)
    console.log(secuenciaMaquina)
   

    const retrasoTurnoJugador = (secuenciaMaquina.length + 1) * 1000

    secuenciaMaquina.forEach(function($cuadro, index){
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function() {
          resaltar($cuadro);
        }, RETRASO_MS);
    });
  
    setTimeout(function() {
       actualizarEstado('Turno del jugador');
       desbloquearInputUsuario();
    },  retrasoTurnoJugador)

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda)


}

function manejarInputUsuario(e){
    const $cuadro = e.target
    resaltar($cuadro)
    secuenciaUsuario.push($cuadro)

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]
    if($cuadro.id !== $cuadroMaquina.id){
        perder()
        return
    }

    if(secuenciaUsuario.length === secuenciaMaquina.length){
        bloquearInputUsuario()
        setTimeout(manejarRonda, 1000)
    }


}



function reiniciarEstado(){
    secuenciaMaquina = []
    secuenciaUsuario = []
    ronda = 0
}

function actualizarNumeroRonda(){
    document.querySelector("#numeroronda").textContent = "Ronda " + ronda
}

//FALTA MANEJAR ronda

function resaltar($cuadro){
    $cuadro.style.opacity = 1
    setTimeout(function(){
      $cuadro.style.opacity = 0.5
    }, 500)
    
}

function actualizarEstado(estado, error = false) {
    const $estado = document.querySelector('#estadojuego');
    $estado.textContent = estado;
    if (error) {
      $estado.classList.remove('alert-primary');
      $estado.classList.add('alert-danger');
    } else {
      $estado.classList.remove('alert-danger');
      $estado.classList.add('alert-primary');
    } 
}

function obtenerCuadroAleatorio(){
    const $cuadros = document.querySelectorAll(".cuadro")
    const indice = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[indice]
}
/*
function obtenerCuadroAleatorio(){
    
    const $cuadros = document.querySelectorAll(".cuadro")
    $cuadros.forEach(function(){
    const indice = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[indice]
    })
}
*/
const $nuevocuadro = obtenerCuadroAleatorio()

function bloquearInputUsuario(){
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = function(){
        }
    })
}

function desbloquearInputUsuario(){
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
    $cuadro.onclick = manejarInputUsuario
    })
}


function perder(){
    bloquearInputUsuario()
    actualizarEstado("Perdiste perdiste no hay nadie peor que vos!", true)
}
function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro){
      $cuadro.onclick = manejarInputUsuario;
    });
}