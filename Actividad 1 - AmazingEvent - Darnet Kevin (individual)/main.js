let eventos = []
var category = []
var arrayCategory = []

async function data(){
  await fetch ("https://amazingeventsapi.herokuapp.com/api/eventos")
  .then(respuesta  => respuesta.json())
  .then(json => eventos.push(...json.eventos))
  category.push(...eventos.map(category => category.category))

  let limpiarCategory = new Set(category)
  arrayCategory = [...limpiarCategory]
  
  console.log(arrayCategory)
  
  let html=""
  let selector = document.querySelector("#category")
  arrayCategory.map(category => {
      html += `
      <option value="${category}">${category}</option>
      `
    })
  selector.innerHTML = html

  selector.insertAdjacentHTML("afterbegin", 
  `<option value="Todos los eventos">Todos los eventos</option>`
  )
  displayCard(eventos)
}
data()

document.getElementById("category").addEventListener("change",function(event){
  var data;
  if (event.target.value == "Todos los eventos"){
    data = eventos
  }
  else{ data = eventos.filter(evento => evento.category == event.target.value)
  }
  console.log(event.target.value)
  displayCard(data)
})



function displayCard(info){
  let toDisplay = []
  
  if (info == undefined){
    toDisplay.push(...info)
  } else {
    toDisplay.push(...info)
  }

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

let inputSearch = document.querySelector("#Search")
inputSearch.addEventListener("keyup",search)

function search(buscar){ 
    var val = buscar.target.value 
    var info = eventos.filter(event => event.name.toLowerCase().includes(val.toLowerCase())) 
    displayCard(info) 
  }