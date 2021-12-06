# App Ionic con Vanilla JS y Cordova

## Demo
https://capacitacion-ionic.web.app

## Requisitos
- Tener una versión actualizada de [node.js](https://nodejs.org/en/) y npm
- Instalar el CLI de Ionic
`$ npm install -g @ionic/cli`
- Instalar cordova
`$ npm install -g cordova`
- Seguir [esta guia](https://cordova.apache.org/docs/en/10.x/guide/platforms/android/index.html#installing-the-requirements) para instalar los requisitos para crear una app Android con cordova
- Chequear si falta algun requerimiento:
`$ cordova requirements`


## Estructura inicial

- `$ ionic init`: crea el json de config de ionic
- `$ git init` para inicializarlo como repo git
- Crear un `package.json` básico.
    - Se puede crear usando el wizard con `$ npm init`

## Ejecutar la app local
Ejecutarla usando el live server de VS Code. Editar el `settings.json` con:

`{
    "liveServer.settings.root": "/www"
}`

<img src="https://drive.google.com/uc?id=1rgGJBUnotXfHwk2BX6qLeUhBKCrh7VDC" alt="initial app structure" width="400"/>

## Cordova
- Ejecutar `$ ionic integrations enable cordova --add` para crear el `config.xml` y los `resources` (splash, icono, etc).
- Agregar plataforma android: `$ ionic cordova platform add android`
    - Agrega los plugins al `package.json`
    - Crea `/platforms/android`
    - Crea `/plugins`
    - [Si da el error de sharp](https://github.com/ionic-team/ionic-cli/issues/4030#issuecomment-502397186)
- `$ cordova build android`
- `$ cordova run android`

## Ionic
- [Componentes Visuales](https://ionicframework.com/docs/components)
