let frutas = ["manzana","pera","piña","maracuya","curuba","cilantro","pera"];

function busqueda(nameFruta){
    let resultado = frutas.filter(fruta => fruta == nameFruta);
    alert(`Resultado: ${resultado}`);
}

function frutasSoloC (letra){
    frutas = frutas.filter(frutaC => frutaC.startsWith(letra) );
}

let frutaBuscar = prompt("Que fruta desea buscar");
busqueda(frutaBuscar);
frutasSoloC("c");

document.write(frutas);
console.log(frutas);

