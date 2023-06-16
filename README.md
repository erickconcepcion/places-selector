# PlacesSelector
__ES:__

Este repositorio fue creado como ejemplo ante un problema que presenta la utilización de la del api js "places" de google maps. Este ejemplo tiene un input que se utiliza para buscar lugares y luego de haber escrito el nombre de un lugar en dicho input se crea una lista con el texto de esos lugares.

__EN:__

This repository was created as an example in response to a problem encountered when using the "places" JavaScript API from Google Maps. This example includes an input field used to search for places, and after typing the name of a place in that input, a list is created with the names of those places.

## El problema (The Problem)
__ES:__

La lista no se refresca en el momento inmediato en el que el observable emite el valor, si no, que espera unos segundos y luego se refresca pero si haces click en algún otro lado se refresca en ese instante.

- Hay un input que detona un evento debounced a 400ms de escribir lo que sea.
- Hay un subject que emite el valor del input cuando sucede ese evento.
- Hay un observable basado en el pipe de ese subject.
- Ese pipe tiene un switchmap para llamar el servicio de get places, un map para que si hubo error retorne empty array, un catch error y un take until para evitar memory leaks.
- Hay un componente de lista que con el async pipe capta ese observable y muestra los elementos del array de lugares.

__EN:__

The list is not immediately refreshed when the observable emits a value. Instead, it waits a few seconds and then refreshes. However, if you click somewhere else, it refreshes instantly.

- There is an input that triggers a debounced event after 400ms of typing anything.
- There is a subject that emits the value of the input when that event occurs.
- There is an observable based on the pipe of that subject.
- The pipe includes a switchMap to call the get places service, a map to return an empty array if there was an error, a catch error, and a take until to avoid memory leaks.
- There is a list component that captures that observable with the async pipe and displays the elements of the places array.
## Como probar (How to test)

__ES:__

Esta es una aplicación de angular que usa `@angular/cli` y como tal debes conocer algunos comandos que se muestran a continuación para probar. Sigue los siguientes pasos para observar aquello que me inquieta y de lo que quiero respuesta:
- Corre `ng serve` para servir en tu maquina local. En caso de requerir usar otro puerto visite la documentación de `@angular/cli`.
- dirígete a [localhost:4200](http://localhost:4200). Si decidiste otro puerto úsalo en su lugar.
- Abre las herramientas de desarrollo del navegador y posiciónate en la pestaña de consola.
- Escribe el nombre de una calle en el input.
- Sin presionar el click ni hacer alguna otra acción espera de 20 a 50 segundos.
- Visualiza y analiza los outputs de la consola con su respectivo tiempo y observa que el input del componente `app-place-list` muestra los cambios al instante.
 
__EN:__

This is an Angular application that uses `@angular/cli`, and as such, you should be familiar with some commands shown below to test it. Follow the steps below to observe what concerns me and for which I seek an answer:

- Run `ng serve` to serve it on your local machine. If you need to use a different port, please refer to the documentation of `@angular/cli`.
- Go to [localhost:4200](http://localhost:4200) If you chose a different port, use it instead.
- Open the browser's developer tools and navigate to the console tab.
- Type the name of a street in the input field.
- Without clicking or performing any other action, wait for 20 to 50 seconds.
- Observe and analyze the console outputs along with their respective timestamps, and notice that the input of the `app-place-list` component instantly reflects the changes.

## Configuración (Config)
__ES:__

La única configuración disponible es el api key la cual estará publica y disponible hasta `2023-06-23T18:00:00 GMT-4` y se edita en la etiqueta script en el head en el archivo `index.html`. Si desea probar mas allá de ese momento utilice una propia.

__EN:__

The only available configuration is the API key, which will be public and accessible until `2023-06-23T18:00:00 GMT-4`. You can edit it in the script tag within the head section of the `index.html` file. If you want to test beyond that time, please use your own API key.
## Objetivo (Objective)
__ES:__

Necesito que alguien me explique por qué sucede este problema y como solucionarlo. Tengo una experiencia promedio en angular, por lo que no logro comprender el porqué de esto. Me sentiría agradecido si me explican detalladamente mediante un `issue` o un `pull request` para publicarlo en la comunidad de __Angular Dominicana__. 

__EN:__

I would like someone to explain to me why this issue occurs and how to solve it. I have an average experience in Angular, so I can't fully understand the reason behind this. I would be grateful if you could explain it to me in detail through an `issue` or a `pull request` so that I can publish it in the __Angular Dominicana__ community.