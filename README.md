# md-links

md-links es un módulo que identifica links y su estatus en archivos markdown.

## Instalación

```sh
$ npm install --save https://github.com/BarbaraRH/SCL007-md-links
```

Carga el módulo vía `require`:

```js
const mdLinks = require("md-links");
```

## Utilización

```js
mdLinks("../README.md");
/*devuelve links dentro del archivo .md (o carpetas con archivos .md) junto al nombre del link y ruta del archivo.*/

mdLinks("../README.md", "--validate");
//además devuelve el estatus del link.

mdLinks("../README.md", "--stats");
//devuelve el número de links.
```

## Utilización desde terminal

Incorporar el siguiente código al archivo .js:

```js
if(require.main === module){
  let path = process.argv[2];
  let options = process.argv[3];
  mdLinks(path, options);
}
```

Luego en la terminal:

```sh
$ node <nombre archivo .js> <ruta archivo .md o carpeta>
```

Si se quiere utilizar una opción:

```sh
$ node <nombre archivo .js> <ruta archivo .md o carpeta> --validate
```
y de modo similar para --stats.