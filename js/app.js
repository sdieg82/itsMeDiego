/* mostrar menu */
const btnMenu = document.querySelector(".menu-btn")
const menu  = document.querySelector(".menu")

btnMenu.addEventListener("click",(e)=>{
    btnMenu.firstElementChild.classList.toggle("none")
    btnMenu.lastElementChild.classList.toggle("none")
    menu.classList.toggle("is-active")

})

//esconder menu al escoger una opcion de este 
menu.addEventListener("click",(e)=>{
    if(e.target.matches(".menu a")) {
        btnMenu.firstElementChild.classList.remove("none")
        btnMenu.lastElementChild.classList.add("none")
        menu.classList.remove("is-active")
    }
    else {
        return false
    }

})

/* 
formulario de contacto 

const $formulario = document.querySelector(".contact-form")
const $loader =  document.querySelector(".contact-form-loader")
const $response = document.querySelector(".contact-form-respose")

$formulario.addEventListener("submit",e =>{
    e.preventDefault()
    $loader.classList.remove("none")
    fetch("https://formsubmit.co/ajax/rither5711@gmail.com",{method:"POST",
    body:new FormData(e.target)
    })
    .then(res =>(res.ok ? res.json():Promise.reject(res)))
    .then(json=>{
            console.log(json)
            $loader.classList.add("none")
            location.hash = "#gracias"
            $formulario.reset()
    })
    .catch(err =>{
        console.log(err)
        let mesaage = err.statusTxt || "Ocurrio un error al enviar intentalo nuevamente"
        $response.querySelector("h3").innerHTML = `Error ${err.status}: ${mesaage}`
    })
    .finally(()=>{
        $loader.classList.add("none")
        setTimeout(()=>{
            location.hash = "#close"
        },3000)
    })
})
*/



/* Indicado avance en el  menu */
addEventListener('DOMContentLoaded',()=>{
    
    const secciones = document.querySelectorAll(".section")
    const menuItems = document.querySelectorAll(".menu_item")
    
    console.log(secciones)
    console.log(menuItems)
    
    const funcionObserver = entries =>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const itemActual = Array.from(menuItems).find(item => item.dataset.url === entry.target.id);
                itemActual.classList.add("isactive")
                for(const item of menuItems){
                    if(item != itemActual){
                        item.classList.remove("isactive")
                    }
                } 
            }
        });
    }
    
    const observer = new IntersectionObserver(funcionObserver,{
        root:null,
        rootMargin:'0px',
        threshold: 0.8
    })
    secciones.forEach(seccion => observer.observe(seccion))

})




