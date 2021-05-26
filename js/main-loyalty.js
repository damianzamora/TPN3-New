let td1=document.getElementById("trDemocrats")
let td2=document.getElementById("trRepublicans")
let td3=document.getElementById("trIndependence")
let td4=document.getElementById("trTotal")
let tabla4 = document.getElementById("tabla4")
let tabla5 = document.getElementById("tabla5")


let estadisticas = {
    democracts:[],
    republicans:[],
    independents:[],
    masVotacionesPerdidas : obtenerDiezPorciento (funcVotacionesPerdidas(data.results[0].members,"missed_votes",false) ,"missed_votes"),
    menosVotacionesPerdidas : obtenerDiezPorciento (funcVotacionesPerdidas(data.results[0].members,"missed_votes",true),"missed_votes"),
    masVotosContraPartido : obtenerDiezPorciento (funcVotacionesPerdidas(data.results[0].members,"votes_with_party_pct",true) ,"votes_with_party_pct"),
    masVotosAfavorPartido : obtenerDiezPorciento (funcVotacionesPerdidas(data.results[0].members,"votes_with_party_pct",false) ,"votes_with_party_pct"),
}


//Recorrer house.js y segun su party, push en cada array. ( Lleno cada array del objeto estadisticas)

for(let i=0; i<(data.results[0].members).length;i++)
{
    if (data.results[0].members[i].party==="D")
        estadisticas.democracts.push(data.results[0].members[i])
        else if (data.results[0].members[i].party==="R")
        estadisticas.republicans.push(data.results[0].members[i])
        else if (data.results[0].members[i].party==="ID")
        estadisticas.independents.push(data.results[0].members[i])
}


/////////////////////////////////////////////////////////////////TABLA 1  - 
//llamo a las funciones para crear la tabla 1

generarTable1(estadisticas.democracts,td1)
generarTable1(estadisticas.republicans,td2)
generarTable1(estadisticas.independents,td3)
table1Totales(estadisticas,td4)


//llamo a las funciones para crear tabla 2 y 3 en partyLoyalty-house y senate
generarTabla4y5Loyalty(estadisticas.masVotosContraPartido,tabla4)
generarTabla4y5Loyalty(estadisticas.masVotosAfavorPartido,tabla5)  


function generarTable1 (array,tabla){
    let row = document.createElement("td");
    row.innerHTML = `<td>${array.length}</td>`
    let row1 = document.createElement("td");
    row1.innerHTML = `<td>${votes_witch_party(array)}</td>`
    tabla.appendChild(row)
    tabla.appendChild(row1)

}
    function votes_witch_party ( arreglo ){
        let acum=0;
        for(let i=0; i<arreglo.length ; i++)
            {
           acum=acum + arreglo[i].votes_with_party_pct ; 
            }
        if(arreglo.length>0){
            acum=(acum/arreglo.length).toFixed(2)
            return acum
            }
            else
            return acum
         }

    function table1Totales ( objeto,tabla){
         
         let suma= objeto.democracts.length + objeto.republicans.length + objeto.independents.length
         let porcentaje = ( votes_witch_party(objeto.democracts) + votes_witch_party(objeto.republicans)
         + votes_witch_party(objeto.independents) ) 
         let row = document.createElement("td");
         row.innerHTML = `<td>${suma}</td>`
         tabla.appendChild(row)
         let row1 = document.createElement("td");
         row1.innerHTML = `<td>${porcentaje}</td>`
         tabla.appendChild(row1)
        }


        function funcVotacionesPerdidas(miembros,propiedad,esAscendente) {
            let arrayAux = [...miembros]   //Creo una copia del arrayOriginal
            arrayAux.sort( (a,b) => {
                if ( a[propiedad] < b[propiedad]) {
                    if(esAscendente){
                        return -1
                    }else {
                        return 1
                    }
                }
                if ( a[propiedad] > b[propiedad]) {
                    if(esAscendente){
                        return 1
                    }else {
                        return -1
                    }
                }
                return 0
            }) 
            return arrayAux
        }
        
        
        function obtenerDiezPorciento(arrayMiembros, propiedad){
            let posicionDiezPorciento = parseInt(arrayMiembros.length * .1)
            let arrayAux = arrayMiembros.splice(0,posicionDiezPorciento +1)
            let limite= arrayAux[arrayAux.length - 1][propiedad]
            arrayMiembros.forEach(miembro => {
                if (miembro[propiedad] === limite){
                    arrayAux.push(miembro)
                }
            })
            return arrayAux
        }


        function generarTabla4y5Loyalty (array,tabla) {

            array.forEach(member =>  {
        
                let row = document.createElement("tr");
                row.innerHTML = `<td>${member.first_name} ${member.middle_name || ""}
                                     ${member.last_name}</a></td>
                <td>${parseInt(((member.total_votes-member.missed_votes)*member.votes_with_party_pct)/100)}</td>
                <td>${member.votes_with_party_pct}</td>`
                tabla.appendChild(row)
            
            })
        }
    