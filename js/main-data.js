let senateData = document.getElementById("json-data")
let checkboxes = document.querySelectorAll("input[type='checkbox']"); 
let selector = document.getElementById("state")


//Muestro todos los datos de la tabla.

renderParty(data.results[0].members)

////////////////////////Creo un arreglo de estados , los ordeno , quito duplicados y los inserto en el SELECT.

let arrayStates=[]
for(let i=0; i<(data.results[0].members).length;i++)
{
    arrayStates.push(data.results[0].members[i].state)
}
arrayStates.sort()
let arrayStatesSinDuplic = []


for(let i=0 ; i<arrayStates.length;i++)
    {
        if(arrayStates[i]!=arrayStates[i+1])
            arrayStatesSinDuplic.push(arrayStates[i])
    }
  
//LLenamos el SELECT con todos los estados del data    

 for(let i=0 ; i<arrayStatesSinDuplic.length ; i++)
 {
   let option1=document.createElement("option")
    option1.innerText=arrayStatesSinDuplic[i];
    selector.appendChild(option1)
 }

//Capturo el valor del Select Option y lo envio a una funcion.

selector.addEventListener("change",function(){

    var selectedOption = this.options[selector.selectedIndex];
    seleccionado=selectedOption.value;
    funcFiltros(seleccionado)
})

//Capturo el evento y llamo a una funcion.
checkboxes.forEach(checkbox =>checkbox.addEventListener("change",function() {
    funcFiltros()
}))
    

function funcFiltros(filtroseleccionado) {
    if(filtroseleccionado==undefined )
    {
        
        selector.style.color="grey"
        senateData.innerHTML = ""     //Limpio la tabla.
        let chequeados=(Array.from(checkboxes).filter(checkbox => checkbox.checked === true))	
        let valoresChequeados = chequeados.map(chequeado => chequeado.value)
        let arreglosFiltrados = data.results[0].members.filter( events => events.party==valoresChequeados[0] || 
            events.party==valoresChequeados[1] || events.party==valoresChequeados[2])  // guardo en AreglosFiltrados todos los campos que cumplan cada condicion
            renderParty(arreglosFiltrados)
    }
    else{  
        let chequeados=(Array.from(checkboxes).filter(checkbox => checkbox.checked === true))	
        let valoresChequeados = chequeados.map(chequeado => chequeado.value)
        if(valoresChequeados=="" && filtroseleccionado!="")
        {
            selector.style.color="blue"
            selector.style.fontWeight="bold"
            senateData.innerHTML = ""
            let arreglosFiltrados = data.results[0].members.filter( events => events.state== seleccionado)
            renderParty(arreglosFiltrados)
        }  
    else 
    if(filtroseleccionado!=undefined  && (valoresChequeados!=""))
    {  
            selector.style.color="blue"
            selector.style.fontWeight="bold"
            senateData.innerHTML = ""
            let arreglosFiltrados = data.results[0].members.filter( events =>( events.party==valoresChequeados[0] || 
            events.party==valoresChequeados[1] || events.party==valoresChequeados[2] ) && (events.state== seleccionado) )  // guardo en AreglosFiltrados todos los campos que cumplan cada condicion
            renderParty(arreglosFiltrados)
            } 
        
}

}  

//Funcion que recorre el arreglo "arreglosFiltrados" y los inserta en la table de senator y house
function renderParty(letra){  
    letra.forEach(member =>  {

        let row = document.createElement("tr");
        row.innerHTML = `<td ><a class="d-flex justify-content-center align-items-center" 
                            href=${member.url}"targer > ${member.first_name} ${member.middle_name || ""}
                             ${member.last_name}</a></td>
        <td>${member.party}</td>
        <td>${member.state}</td>
        <td>${member.seniority}</td>
        <td>%${member.votes_with_party_pct}</td>`
        senateData.appendChild(row)
    
    })
}


////////////////////////////////////////////////////// Estadisticas

let estadisticas = {
    democracts:[],
    republicans:[],
    independents:[]
}




