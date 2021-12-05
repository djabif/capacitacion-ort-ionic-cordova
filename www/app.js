let menu = document.querySelector('ion-menu');
let router = document.querySelector("ion-router");

let paginaEnvios = document.querySelector("pagina-envios");
let paginaNuevoEnvio = document.querySelector("pagina-nuevo-envio");
let paginaDetalleEnvio = document.querySelector("pagina-detalle-envio");
let paginaLogin = document.querySelector("pagina-login");
let paginaRegistro = document.querySelector("pagina-registro");

router.addEventListener("ionRouteDidChange", (e) => {
    let { detail } = e;

    // ocultar todas las páginas
    let paginas = document.getElementsByClassName('pagina');
    for (let i = 0; i < paginas.length; i++) {
        paginas[i].style.display = "none";
    }

    if (detail.to === "/login") {
        paginaLogin.style.display = "block";
    }

    if (detail.to === "/registro") {
        paginaRegistro.style.display = "block";
    }

    if (detail.to === "/") {
        paginaEnvios.style.display = "block";
        getEnviosDelUsuarioLogueado();
    }

    if (detail.to === "/nuevo-envio") {
        paginaNuevoEnvio.style.display = "block";
        getDepartamentos();
    }
    
    //detalle envio
    if (detail.to.includes("/detalle-envio")) {
        paginaDetalleEnvio.style.display = "block";
        cargarDetalleEnvio();
    }
});

window.login = function() {
    let usuario = document.getElementById('usuarioLogin').value;
    let password = document.getElementById('passwordLogin').value;

    fetch('https://envios.develotion.com/login.php', {
        method: "POST",
        body: JSON.stringify({
            "usuario": usuario,
            "password": password
        })
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
            // guardar el apiKey en localStorage
            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('id', data.id);
            // navegar a la pagina de envios
            router.push('/');
        } else {
            //error
            debugger;
        }
        
    })
    .catch(function(error) {
        debugger;
        console.log(error);
    });
}

window.registro = function() {
    let usuario = document.getElementById('usuarioRegistro').value;
    let password = document.getElementById('passwordRegistro').value;

    fetch('https://envios.develotion.com/usuarios.php', {
        method: "POST",
        body: JSON.stringify({
            "usuario": usuario,
            "password": password
        })
      })
    .then(response => response.json())
    .then(function(data) {
        if (data.codigo === 200) {
            // guardar el apiKey en localStorage
            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('id', data.id);
             // navegar a la pagina de envios
            router.push('/');

        } else {
            //error
            debugger;
        }
        
    })
    .catch(function(error) {
        debugger;
        console.log(error);
    });
}

window.cerrarMenu = function() {
    menu.close();
};

function cargarEnvios(envios) {
    document.getElementById('listaEnvios').innerHTML = "";
    // cargar data
    for (let i = 0; i < envios.length; i++) {
        document.getElementById('listaEnvios').innerHTML +=
        `
        <ion-item button href="/detalle-envio?id=${envios[i].id}">
            ${envios[i].id}
        </ion-item>
        `
    }
} 

function getEnviosDelUsuarioLogueado() {
    fetch('https://envios.develotion.com/envios.php?idUsuario=' + localStorage.getItem('id'), {
        method: "GET",
        headers: {
          "apikey": localStorage.getItem('apiKey')
        }
      })
    .then(response => response.json())
    .then(function(data) {
        cargarEnvios(data.envios);
    })
    .catch(function(error) {
        console.log(error);
    });
}


function cargarDetalleEnvio() {
    let paramString = window.location.href.split('?')[1];
    let idEnvio = paramString.split('=')[1];

    paginaDetalleEnvio.innerHTML = `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Detalle Envio ${idEnvio}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      Detalle Envio ${idEnvio}
    </ion-content>
  `;
} 

function getDepartamentos() {
    fetch('https://envios.develotion.com/departamentos.php', {
        method: "GET",
        headers: {
          "apikey": localStorage.getItem('apiKey')
        }
      })
    .then(response => response.json())
    .then(function(data) {
        cargarSelectDepartamentos(data.departamentos);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function cargarSelectDepartamentos(departamentos) {
    document.getElementById('selectDepartamentos').innerHTML = "";
    for (let i = 0; i < departamentos.length; i++) {
        document.getElementById('selectDepartamentos').innerHTML +=
        `<ion-select-option value="${departamentos[i].id}">${departamentos[i].nombre}</ion-select-option>`
    }
}
