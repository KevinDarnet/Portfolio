let eventos = [];

async function getData() {
  await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then((response) => response.json())
    .then((json) => {
      eventos.push(...json.eventos);
    });
    asistencia(eventos)
    recaudacion(eventos)
    categorias(eventos)
    porcentajeAsistecia()
    mayorCapacidad()
  };

getData();

function asistencia(eventos){
    let porcentajeAsistecia = []
    let fila =  document.getElementById("porcentajeAsistencia")
      
    eventos.forEach(data =>{
    
    if( data.assistance == undefined){
        porcentajeAsistecia.push("Evento Futuro")
    }else{porcentajeAsistecia.push(Math.round((data.assistance * 100) / data.capacity))}    
    })
   
   porcentajeAsistecia.map(item => {
       
    let td = document.createElement("td")

    fila.append(td)
    td.append(item)

   })
   console.log(porcentajeAsistecia)
}

// precio x asistencia
function recaudacion(eventos){
    let recaudacionEvento = []
    let fila =  document.getElementById("price")
      
    eventos.forEach(data =>{
    
    if( data.assistance == undefined){
        recaudacionEvento.push("Evento Futuro")
    }else{recaudacionEvento.push(data.price * data.assistance)}    
    })
   console.log(recaudacionEvento)
   
   recaudacionEvento.map(item => {
       
    let td = document.createElement("td")

    fila.append(td)
    td.append(item)

   })
  console.log(recaudacionEvento)

}

function categorias(eventos){
    
    let fila =  document.getElementById("categorias")
      
    eventos.forEach(data =>{
       
   let td = document.createElement("td")

   fila.append(td)
   td.append(data.category)
})
}


let mayorAud = document.getElementById ("#mayorAudiencia")
let menorAud = document.getElementById("#menorAudiencia")
let mayorCap = document.getElementById("#mayorCapacidad")

function porcentajeAsistecia(){
  let datitos = []
  datitos.push(...eventos.filter(evento=>evento.assistance != undefined))
  datitos.map(evento => evento.porcentaje = (evento.assistance * 100) / evento.capacity)
  datitos.sort((a,b) => b.porcentaje - a.porcentaje)
  mayorAud.innerHTML = datitos[0].porcentaje.toFixed(1)
  menorAud.innerHTML = datitos[datitos.length-1].porcentaje.toFixed(1)
  
  console.log(mayorAud)
  console.log(menorAud)
}

function mayorCapacidad(){
  let datitos2 = []
  datitos2.push(...eventos)
  datitos2.sort((a,b)=> b.capacity - a.capacity)

  mayorCap.innerHTML = datitos2[0].name + " " + datitos2[0].capacity
  console.log(mayorCap)
}
