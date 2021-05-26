let botonReadMore = document.getElementById("readMore")
let divcarhome = document.getElementById("card2")


//Boton "READ MORE"
botonReadMore.addEventListener("click" ,function(){
    if (divcarhome.style.display!="block")
    {
       divcarhome.style.display="block"
       botonReadMore.innerText="Read Less...."
    }
    else
    {
    divcarhome.style.display="none"
    botonReadMore.innerText="Read More"
    }
})
