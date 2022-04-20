let fechaActual = ""
let datos = []

  async function data(){
  await fetch ("https://amazingeventsapi.herokuapp.com/api/eventos")
  .then(respuesta  => respuesta.json())
  .then(json => {
      fechaActual = json.fechaActual
      datos.push(...json.eventos.filter(fechas => fechas.date < fechaActual)) 
  })
  console.log(datos)
  displayCard(datos)
}
data()

function displayCard(date){
    let toDisplay = date 

  let html = ""
  toDisplay.map(eventos =>{
    html += `
        <div class="card">
          <div class="cardinterno"> 
            <h2>${eventos.name}</h2>
            <p>${eventos.description}</p>
            <p>${eventos.category}</p>
            <p>${eventos.date}</p>
            <div class="divanchor">
              <a class="buttoncard" href="./detalles.html?id=${eventos.id}">Ver Detalle</a>
            </div>            
          </div>
          <div class="cardinterno2">
            <img class="imgcard" src="${eventos.image}">
          </div>        
        </div>
      `
  })
  
  document.querySelector("#CARD").innerHTML = html
  }
