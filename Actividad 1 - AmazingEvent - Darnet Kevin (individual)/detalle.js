var eventos = []
async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())
        .then(json => eventos.push(...json.eventos))
        
    console.log(eventos)

        var id = 1
        eventos.map(event =>event.id = id++)
        
    console.log(eventos)
     
    console.log(location)
    console.log(location.search)
    
    id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    console.log(selectedId)

    var evento = eventos.find(function(evento) {
        return evento.id == selectedId
    })
    var templateHtml = `    
    <section class="contenedorcard">
        <div class="conteinertituloheader">
            <img class="logo" src="./Imagenes/logobien.png" alt="" />
            <h1 class="amazingevents">Amazing Events</h1></div>
        <div class="card">
            <div class="cardinterno"> 
                <h2>${evento.name}</h2>
                <p>Categoría: ${evento.category}</p>
                <p>Descripción: ${evento.description}</p>
                <p>Fecha: ${evento.date}</p>
                <p>Lugar: ${evento.place}</p>
                <p>Capacidad: ${evento.capacity}</p>
                <p>Asistieron: ${evento.assistance}</p>
                <p>Precio: ${evento.price}</p>
                </div>
            <div class="cardinterno2">
                <img class="imgcard" src="${evento.image}">
            </div>        
        </div>
    </section>
    `
    document.querySelector("#CARD").innerHTML = templateHtml
}

getData()