"use strict";

var vectoresDeAprendizaje = [];


var steps = [];

function Network(){

    this.learn = function() {

        var Weight = []; //Matriz de pesos

        var n = vectoresDeAprendizaje[0].length; //Longitud de un vector.
        //var n = 4; //Longitud de un vector.

        var m = vectoresDeAprendizaje.length; //Cantidad de vectores de aprendizaje.

        function construirMatriz() {
            for (var i = 0; i < n; i++) {
                Weight.push(new Array());
                for (var j = 0; j < n; j++) {
                    Weight[i].push(0);
                }
            }
        }

        construirMatriz();

        function aprendizaje() {
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (i == j) {
                        Weight[i][j] = 0;
                    } else {
                        var w = pesoEnPosicion(i, j);
                        //console.log("Peso de i: "+i+" j: "+j+" es "+w);
                        Weight[i][j] = w;
                    }
                }
            }
        }

        aprendizaje();

        //Elemento 2 del vector 1
        function pesoEnPosicion(i, j) {
            var suma = 0;

            //m es la cantidad de vectores de aprendizaje.
            for (var k = 0; k < m; k++) {
                suma += vectoresDeAprendizaje[k][i] * vectoresDeAprendizaje[k][j];
            }
            return suma;
        }

        function nuevaEntrada(vectorEntrada) {
            var nuevoVector = [];

            for (var i = 0; i < vectorEntrada.length; i++) {
                var suma = 0;
                for (var j = 0; j < n; j++) {
                    var elementVectorEntrada = vectorEntrada[j];
                    //console.log("S("+i+','+j+") "+Weight[i][j]);
                    //console.log("e * w",i,j);
                    suma += Weight[i][j] * elementVectorEntrada;
                }
                //console.log(suma);
                if (suma > 0) {
                    nuevoVector[i] = 1;
                    //return 1;
                    //nuevoVector.push(1);//TODO Cambiar para que ande en otro lenguaje.
                } else if (suma < 0) {
                    nuevoVector[i] = -1;
                    //nuevoVector.push(-1);
                } else {
                    nuevoVector[i] = vectorEntrada[i];
                    //nuevoVector.push(elementVectorEntrada);
                }
            }
            //console.log("anterior vector",vectorEntrada);
            //console.log("nuevo vector",nuevoVector);
            return nuevoVector;
        }

        function mostrarNombre(idx) {
            var name;
            switch (idx) {
                case 0:
                    console.log("Es una A");
                    name = "A";
                    break;
                case 1:
                    console.log("Es una B");
                    name = "B";
                    break;
                case 2:
                    console.log("Es una C");
                    name = "C";
                    break;
                default:
                    console.log("no se que es", idx);
                    name = "XXX";
                    break;
            }
            return name;
        }

        function esUnVectorDeAprendizaje(vectorEntrada) {
            for (var k = 0; k < m; k++) {
                var unVectorDeAprendizaje = vectoresDeAprendizaje[k];

                var p = 0;
                while (unVectorDeAprendizaje[p] == vectorEntrada[p] && p < n) {
                    p++;
                }
                //Si todos los elementos son iguales al vector de aprendizaje
                //console.log("P N ",p,n);
                if (p == n) {
                    //console.log("SON IGUALES");
                    var nombre = mostrarNombre(k);
                    console.log("return nombre"+nombre);
                    return nombre;
                    //console.log("es un ",k);
                    //return true;
                }
            }
            return false;
        }

        function equals(vectorA, vectorB) {
            var p = 0;

            while (vectorA[p] == vectorB[p] && p < vectorA.length) {
                //console.log(vectorA[p],vectorB[p]);
                p++;
            }
            //Si todos los elementos son iguales al vector de aprendizaje
            if (p == n) {
                return true;
            }
            return false;
        }

        function check(vectorEntrada) {
            var anterior = vectorEntrada;
            steps.push(anterior);

            var nuevoVector = nuevaEntrada(anterior);
            if (equals(anterior, nuevoVector)) {
                //console.log(JSON.stringify(anterior));
                //console.log(JSON.stringify(nuevoVector));
                console.log("Termino el análisis!!");
                var nombre = esUnVectorDeAprendizaje(nuevoVector);
                console.log("NOMBRE check"+nombre);
                return nombre;
            } else {
                nuevoVector = nuevaEntrada(anterior);
                check(nuevoVector);
            }
        }

        return check;

//check([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0]);

//var toDiscover = [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
    }

};




