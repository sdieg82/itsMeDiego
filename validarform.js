const btnReset = document.querySelector("#btnreset")
const btnEnviar = document.querySelector("#enviar")


//variables del formulario
const mensaje = document.querySelector("#mensaje")
const nombre = document.querySelector("#nombre")
const email = document.querySelector("#email")

const $formulario = document.querySelector(".contact-form")
const $loader =  document.querySelector(".contact-form-loader")
const $response = document.querySelector(".contact-form-respose")


const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;       


eventListeners()

function eventListeners(){
    //inicia con la app
    document.addEventListener("DOMContentLoaded",iniciarApp);
    //validadcio de formulario
    email.addEventListener('blur',validarFormulario);
    nombre.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);
    //Reinicia el formulario
    btnReset.addEventListener('click',limpiaFormulario);
    //enviar email
    $formulario.addEventListener("submit", enviarEmail)
}

//aCCIONES QUE SE QUIERES HACER LA CARGAR EL DOCUMENTO
function iniciarApp(){
    btnEnviar.disabled = true
    btnEnviar.classList.add('desactivar-btn')
}

function validarFormulario(e){
    if(e.target.value.length > 0){
        const menError =  document.querySelector("p.error");
        if(menError){
            menError.remove();
        }
        
        //elimina los colores de errores
        e.target.classList.remove('border-neg')
        e.target.classList.add('border-pos')
    }
    else{
        e.target.classList.remove('border-pos')
        e.target.classList.add('border-neg')
        mostrarError("Campo Obligatorio")
    }

    if(e.target.type==='email'){
        if(er.test(e.target.value)){
            const menError =  document.querySelector("p.error");
            if(menError){
                menError.remove();
            }
            e.target.classList.remove('border-neg')
            e.target.classList.add('border-pos')
        }
        else{
            e.target.classList.remove('border-pos')
            e.target.classList.add('border-neg')
            mostrarError("e-mail no valido")
        }
    }

    if(er.test(email.value) && nombre.value!=="" && mensaje.value!==""){
        console.log("campos validados")
        btnEnviar.disabled = false
        btnEnviar.classList.remove('desactivar-btn')
    }else{
        console.log("Aun faltan campos")
    }

}


function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje
    mensajeError.classList.add('error')

    const errores = document.querySelectorAll(".error")
    if(errores.length == 0){
        $formulario.appendChild(mensajeError)
    }
}


///envia email

function enviarEmail(e){

    e.preventDefault()
    //$loader.classList.remove("none")
    fetch("https://formsubmit.co/ajax/sedifab@gmail.com",{method:"POST",
        body:new FormData(e.target)
    })
    .then(res =>(res.ok ? res.json():Promise.reject(res)))
    .then(json=>{
        console.log(json)
        //$loader.classList.add("none")
        location.hash = "#gracias"
        $formulario.reset()
    })
    .catch(err =>{
        console.log(err)
        let mesaage = err.statusTxt || "Ocurrio un error al enviar intentalo nuevamente"
        $response.querySelector("h3").innerHTML = `Error ${err.status}: ${mesaage}`
    })
    .finally(()=>{
        //$loader.classList.add("none")
        setTimeout(()=>{
        location.hash = "#close"
        },3000)
    })
}


//limpia el formulario
function limpiaFormulario(e){
    $formulario.reset()
    iniciarApp()
}
