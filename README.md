# Práctica Redes Neuronales

Práctica con la red neuronal Hopfield en javascript.


Red Discreta
-1  1 (enfoque)
 0  1

Red Continua
[-1, 1]
[ 0, 1]


Red Asociativa Monocapa.

Todos conectados con todos.

La salida de cada nodo es la entrada de los demás nodos.


Pasos
1 - Aprendizaje.

Determinar todos los vectores de aprendizaje(vectores de entrada)

V1[C1,C1,...,C3]  Vector con características. Tienen que tener el mismo length.
V2[C1,C1,...,C3]
V3[C1,C1,...,C3]

Cada elemento del vector es una entrada de la red (C1 con X1, C2 con X2, ..., CN con Xn)


2 - Generar matriz de pesos

n = length de los vectores.
W = [n * n];

Calculo de matriz de peso
1)  La más fácil: W = sumatoria de los vectores de entrada por su traspuesta  - una matriz identidad.
    La red en este momento ya aprendió.

2) Opción 2. (Integrales)
    Función partida.

    W(ij) =  sumatoria desde k = 1 hasta M de elementoi^k * element j^k si i != j
             0 si i == j

    La red en este momento ya aprendió.


Funcionamiento (Como funciona la red)
1 vector para los coches de lujo
1 vector para los coches economicos
1 vector para los coches familiares
1 vector para los coches deportivos



Vector de entrada = [s1,s2,s3,...,sN]. Características de un coche en particular. (un torino, etc)

Hay que definir el vector de entrada y chequear a que vector de aprendizaje pertence.


Hay que generar un nuevo vector de entrada con los mismo elementos pero cambiando.
VE2 = [s1,s2,s3,...,sN];

El nuevo elemento(s1) es =
    S1 = {
            1 si la sumatoria desde j = 1 hasta N de W(ij)*S1 > 0
            - 1 si la sumatoria desde j = 1 hasta N de W(ij)*S1 < 0
            S1  si la sumatoria desde j = 1 hasta N de W(ij)*S1 = 0
        }


Si VE2 == VE1  el Vector de entrada significa que son iguales a un vector de aprendizaje.

Si VE2 == VE1 se genera un nuevo vector de entrada 3 y lo comparo con el vector 2

Sigue hasta que son iguales con algun vector con el que hice el aprendizaje.


---------------------------------------------------------------
Ejemplo


V1 = [-1,-1,-1,-1,-1,-1]
V1 = [1 ,1, 1,-1,-1,-1]
V1 = [1 ,1 ,1 ,1 ,1 ,1]


n = 6; //Largo
m = 3 // cantidad vectores

Hay 6 características.

Hay 6 elementos

Matriz de peso

W(6*6) = [][]


Opcion 1 = Multiplico vector por su traspuesta - la matriz identidad.

Opcion 2 = Sumatoria y comparación de la los vectores.

Obtengo nuevo vector de entrada.

Ve2 = [1,1,-1,1,1,1];

Comparo vector de entrada dos con el de entrada uno

Son != entonces genero un vector de entrada 3 a partir del vector de entrada 2.

Ve2 multiplicado por cada fila en la  matriz de peso.

Una vez que el vector de entrada es igual a uno de los vectores de aprendizaje se corta.
Siempre hay un resultado final.




































