let tablaResul = [];
let indexN = 0;

function resul(nombre,salarioB,horasT){
    let trabajadores = {nombreRes:nombre,
                    salarioRes:salarioB,
                    horasRes:horasT
                    };
    tablaResul.push(trabajadores);
    return trabajadores;
}

function saveDatosLocalArray(){
    localStorage.setItem("formulario",JSON.stringify(tablaResul)); //Pasa el array a string y lo guarda en el local
}

function crearTable(){
    table.innerHTML = "";
    tablaResul=JSON.parse(localStorage.getItem("formulario")); //trae los valores del local para poderlos usar
    if(tablaResul === null){
        tablaResul = [];
    }
    else{
        tablaResul.forEach(element => {
            indexN = indexN + 1;
            table.innerHTML += `
                    <tr id="trEliminar${indexN}">
                        <td>${element.nombreRes}</td>
                        <td>${element.salarioRes}</td>
                        <td>${element.horasRes}</td>
                        <td><button class="btnEliminar" id="btnEliminar" onclick="eliminar(this)">Eliminar</button></td>
                    </tr>`;
        });
    }
}

let table = document.getElementById("tableBody");

// let botonEliminar = document.getElementById(`btnEliminar${indexN}`);
//             botonEliminar.addEventListener("click",(event)=>{
//                 event.target.parentNode.parentNode.remove();
//                 }
//             )

document.addEventListener('DOMContentLoaded',crearTable);
// document.getElementById("btnEliminar").onclick=eliminar(this);

function eliminar(td) {
    let finIndex = 0;
    for(i=0;i < indexN;i++){
        if(i<=indexN){
            finIndex++;
            document.getElementById(`trEliminar${finIndex}`);
            td.parentNode.parentNode.remove();
        }
        else{
            alert("ERROR")
        }
    }
}

function horasExtras(horasTrabajadas,salarioBase){
    let horasExt = parseInt(horasTrabajadas) - 35;
    if (horasTrabajadas > 35){
            let salarioExt = parseFloat(salarioBase*1.5) - parseFloat(salarioBase);
            salarioExt *= horasExt;
            let salario = (horasTrabajadas * salarioBase) / 35;
            salario += salarioExt;
            return Math.round(salario);
        }
    
    else {
        let salario = (horasTrabajadas * salarioBase) / 35;
        return Math.round(salario);
    }
}

function impuestosSueldo (salarioTotal){
    if( salarioTotal >= 100000){
        let salarioPagar = salarioTotal*0.2;
        salarioPagar = salarioTotal-salarioPagar;
        return salarioPagar;
    }
    else {
        return salarioTotal;
    }
}

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", envio);

function envio(e){
    let nombreTrabajador = document.getElementById("nombre").value;
    let salarioBase = document.getElementById("salario").value;
    let horasTrabajadas = document.getElementById("horasTra").value;
    /////////////////////////////////////////////////////////////////
    let salarioTotal = horasExtras(horasTrabajadas,salarioBase);
    salarioTotal = impuestosSueldo (salarioTotal);
    resul(nombreTrabajador,salarioTotal,horasTrabajadas);
    formulario.reset();
    saveDatosLocalArray();
}







// function limpiarFormulario() {
//     document.getElementById("nombre").value = '';
//     document.getElementById("salario").value = '';
//     document.getElementById("horasTra").value = '';
// }