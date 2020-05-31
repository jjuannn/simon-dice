console.log("Hola")

const cuadroUno = document.querySelector("#cuadro-1")
const cuadroDos = document.querySelector("#cuadro-2")
const cuadroTres = document.querySelector("#cuadro-3")
const cuadroCuatro = document.querySelector("#cuadro-4")

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
