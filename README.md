# Desafio Backend

## Proyecto desarrollado con Express Js

A continuacion los metodos REST disponibles:

1. Metodo: GET, URL: / => Retorna un json personalizado con informacion sobre la hora actual en formato Berlin Clock.

2. Metodo: POST, URL: / => Recibe una fecha en formato ISO 8601 y retorna un json personalizado de la misma en formato Berlin Clock.

Ejemplo de como debe formarse el request:

```json
{
  "date": "2017-06-13T19:11:05"
}
```

3. Metodo: GET, URL: /graph => Retorna una imagen PNG con una representacion de la fecha actual en formato Berlin Clock.

4. Metodo: POST, URL: /graph: Recibe una fecha en formato ISO 8601 y retorna una imagen PNG con una representacion de la fecha indicada en formato Berlin Clock.

- Nota: El formato json que se envia para indicar la fecha a convertir es el mismo que en el punto 2.

## Json retornado en el caso 1

Ejemplo del json retornado:

```json
{
  "sec": 0,
  "five_hour": 900,
  "one_hour": 240,
  "five_min": 10,
  "one_min": 1
}
```

A continuacion la explicacion de los keys:

- sec: Boolean. 1 si se trata de un segundo par, 0 para un segundo impar. Esto es usado en la generacion de la imagen para indicar si se dibuja de rojo o amarillo el indicador de los segundos.

- five_hour: Indica la cantidad de minutos de la primera fila en el formato Berlin Clock. Los valores posibles son: 0, 300, 600, 900 y 1200.

- one_hour: Indica la cantidad de minutos de la segunda fila en el formato Berlin Clock. Los valores posibles son: 0, 60, 120, 180 y 240.

- five_min: Indica la cantidad de minutos de la tercera fila en el formato Berlin Clock. Los valores posibles son: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 y 55.

- one_min: Indica la cantidad de minutos de la cuarta fila en el formato Berlin Clock. Los valores posibles son: 0, 1, 2, 3 y 4.

## Uso de canvas para generar las imagenes

Para este proyecto se utilizo node-canvas.

En caso de utilizar ubuntu se deben instalar las siguientes dependencias:

sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++

Para mayor informacion consutar el siguiente enlace:

https://github.com/Automattic/node-canvas

