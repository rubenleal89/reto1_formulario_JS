let tablaResul = [];
let indexN = 0;
// let idLocal = identificador();

function identificador(){
    let lastId = localStorage.getItem("lastId") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("lastId", JSON.stringify(newId));
    return newId;
}

function eliminarLocal(identificador) {
    JSON.parse(localStorage.getItem(identificador))
    let indexArray = tablaResul.findIndex(element => element.Id === identificador)
    indexArray.splice(indexArray,1);
    localStorage.setItem("formulario",JSON.stringify(tablaResul));    
}

function resul(nombre,salarioB,horasT){
    let trabajadores = {nombreRes:nombre,
                    salarioRes:salarioB,
                    horasRes:horasT,
                    Id:identificador()
                    };
    tablaResul.push(trabajadores);
    return trabajadores;
}


function validaciones(nombreTrabajador,salarioBase,horasTrabajadas){
    if (isNaN(nombreTrabajador) && (/^\d*\.\d+$/.test(salarioBase) || /^[0-9]+$/.test(salarioBase)) && /^[0-9]+$/.test(horasTrabajadas)){
        let salarioTotal = horasExtras(horasTrabajadas,salarioBase);
        salarioTotal = impuestosSueldo (salarioTotal);
        resul(nombreTrabajador,salarioTotal,horasTrabajadas);
        formulario.reset();
        saveDatosLocalArray();
    }
    else {
        alert("Revice que los datos sean correctos");
    }
    
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
                    <tr data-id="trEliminar${indexN}">
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
    let filaEliminar = td.parentNode.parentNode//.remove();
    document.getElementById(`trEliminar`);
    let dataId = filaEliminar.getAttribute("data-id");
    filaEliminar.remove();
    eliminarLocal(dataId);
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
    // e.preventDefault();
    validaciones(nombreTrabajador,salarioBase,horasTrabajadas);
}







// function limpiarFormulario() {
//     document.getElementById("nombre").value = '';
//     document.getElementById("salario").value = '';
//     document.getElementById("horasTra").value = '';
// }