let nameTrabajador;
let salarioFijo;
let horasTrabajo;
let arrayTabla = [];

function saveLocalStore(){
    localStorage.setItem("fomulario",JSON.stringify(arrayTabla))
}

class datosFormulario {
    constructor(nombre,salario,horas){
        this.nombre = nombre;
        this.salario = salario;
        this.horas = horas;
    }
    metoTabla(){
        let objTbala = {nombreObj:this.nombre,salarioObj:this.salario,horasObj:this.horas}
        arrayTabla.push(objTbala);
    }
}

let formualario = document.getElementById("formulario");
formualario.addEventListener("submit",envio)

function envio(e){
    nameTrabajador = document.getElementById("nombre").value;
    salarioFijo = document.getElementById("salario").value;
    horasTrabajo = document.getElementById("horasTra").value;
}

const trabajador = new datosFormulario(nameTrabajador,salarioFijo,horasTrabajo);
trabajador.metoTabla();