"use strict";

var vectoresDeAprendizaje = [];


var deportivos = [-1,-1,-1,-1,-1,-1];
var familiares = [1 ,1, 1,-1,-1,-1];
var lujosos    = [1 ,1 ,1 ,1 ,1 ,1];

vectoresDeAprendizaje.push(deportivos);
vectoresDeAprendizaje.push(familiares);
vectoresDeAprendizaje.push(lujosos);

//vectoresDeAprendizaje.push([1, 1, 1, 1]);
//
//vectoresDeAprendizaje.push([-1,-1,-1,-1]);


var Weight = []; //Matriz de pesos

var n = deportivos.length; //Longitud de un vector.
//var n = 4; //Longitud de un vector.

var m = vectoresDeAprendizaje.length; //Cantidad de vectores de aprendizaje.

function construirMatriz(){
    for(var i = 0; i < n; i++){
        Weight.push(new Array());
        for(var j = 0; j < n; j++){
            Weight[i].push(0);
        }
    }
}

//console.log(vectoresDeAprendizaje);
construirMatriz();
//console.log(Weight);

function aprendizaje(){
    for(var i = 0; i < n; i++){
        for(var j = 0; j < n;j++){
            if(i == j){
                Weight[i][j] = 0;
            }else{
                var w = pesoEnPosicion(i,j);
                //console.log("Peso de i: "+i+" j: "+j+" es "+w);
                Weight[i][j] = w;
            }
        }
    }
}

aprendizaje();
console.log(Weight);

//Elemento 2 del vector 1
function pesoEnPosicion(i,j){
    var suma = 0;

    //m es la cantidad de vectores de aprendizaje.
    for(var k = 0; k < m; k++){
        suma += vectoresDeAprendizaje[k][i] * vectoresDeAprendizaje[k][j];
    }
    return suma;
}

function nuevaEntrada(vectorEntrada){
    var nuevoVector = [];

    for(var i = 0; i < vectorEntrada.length; i++){
        var suma = 0;
        for(var j = 0; j < n; j++){
                var elementVectorEntrada = vectorEntrada[j];
                //console.log("S("+i+','+j+") "+Weight[i][j]);
                //console.log("e * w",i,j);
                suma += Weight[i][j] * elementVectorEntrada;
        }
        //console.log(suma);
        if(suma > 0){
            nuevoVector[i] = 1;
            //return 1;
            //nuevoVector.push(1);//TODO Cambiar para que ande en otro lenguaje.
        }else if(suma < 0){
            nuevoVector[i] = -1;
            //nuevoVector.push(-1);
        }else{
            nuevoVector[i] = vectorEntrada[i];
            //nuevoVector.push(elementVectorEntrada);
        }
    }
    console.log("anterior vector",vectorEntrada);
    console.log("nuevo vector",nuevoVector);
    return nuevoVector;
}

function mostrarNombre(idx){
    switch (idx){
        case 0:
            console.log("Es un Deportivo");
            break;
        case 1:
            console.log("Es un Familiar");
            break;
        case 2:
            console.log("Es un Lujoso");
            break;
    }
}

function esUnVectorDeAprendizaje(vectorEntrada){
    for(var k = 0; k < m; k++){
        var unVectorDeAprendizaje = vectoresDeAprendizaje[k];

            var p = 0;
            while(unVectorDeAprendizaje[p] == vectorEntrada[p] && p < n){
                p++;
            }
            //Si todos los elementos son iguales al vector de aprendizaje
            //console.log("P N ",p,n);
            if(p == n){
                mostrarNombre(k);
                //console.log("es un ",k);
                return true;
            }
    }
    return false;
}

function equals(vectorA,vectorB){
    var p = 0;

    while(vectorA[p] == vectorB[p] && p < vectorA.length){
        //console.log(vectorA[p],vectorB[p]);
        p++;
    }
    //Si todos los elementos son iguales al vector de aprendizaje
    if(p == n){
        return true;
    }
    return false;
}

function check(vectorEntrada){
    var anterior = vectorEntrada;

    var nuevoVector = nuevaEntrada(anterior);
    if(equals(anterior,nuevoVector)){
        //console.log(nuevoVector);
        esUnVectorDeAprendizaje(nuevoVector);
        console.log("Termino");
    }else{
        nuevoVector = nuevaEntrada(anterior);
        check(nuevoVector);
    }
}

//check([-1,-1, 1,1,1,1]);
//check([-1,1,-1,1,-1,1]);
//check([1,-1,1,-1,1,-1]);
//check([-1,1,-1,-1,-1,1]);
//check([1,1,1,-1,-1,-1]);
//nuevaEntrada([-1,1,-1,1,-1,1]);
//nuevaEntrada([ 1, -1, 1, -1, 1, -1 ]);

//nuevaEntrada([1,-1,1,-1,1,-1]);
//console.log("INVERSO");
//nuevaEntrada([ -1, 1, -1, 1, -1, 1 ]);


