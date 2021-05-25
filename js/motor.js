var productos=[

    {
        foto:"img/bici.jpg",
        nombre:"Orbea",
        detalle:"mountain bike",
        pequena:500,
        mediana:700,
        grande:900
    },
    {
        foto:"img/mondraker.jpeg",
        nombre:"Mondraker",
        detalle:"mountain bike",
        pequena:700,
        mediana:800,
        grande:1000
    },
    {
        foto:"img/cannondale.jpg",
        nombre:"Cannondale",
        detalle:"mountain bike",
        pequena:1000,
        mediana:1200,
        grande:1400
    },

]

var pedido=[]

pintar();

function pintar() {
    for(let x=0; x<productos.length;x++){
        document.getElementById('productos').innerHTML+=` <div class="cajabici">
        <div class="imagenbici">
               
            <img src="${productos[x].foto}" alt="">
        </div>
        <div class="detalle">
            <h2>${productos[x].nombre}</h2>
            <p>${productos[x].detalle}</p>
        </div>
        <div class="genero">
            <input type="checkbox" name="sexo${x}" id="hombre${x}"><p>Hombre</p>
            <input type="checkbox" name="sexo${x}" id="mujer${x}"><p>Mujer</p>
            
        </div>
        <div >
        <div class="botones" onclick="resta(${x})">menos</div>
        <div id="numero${x}">1</div>
        <div class="botones" onclick="suma(${x})">mas</div>
        </div>
        <div class="opciones">
           <div> <input type="radio" name="tamano${x}" id="tamanop${x}"><p>26"</p></div>
          <div>  <input type="radio" name="tamano${x}" id="tamanom${x}" checked><p>27,5"</p></div>
          <div>  <input type="radio" name="tamano${x}" id="tamanog${x}"><p>29"</p></div>
        </div>
        <div class="botonpedido">
            <button onclick="pedir(${x})">Pedir</button>
        </div>
        <div class="precio" id="precio${x}"> </div>
    </div>
        `;
    }
    document.getElementById('pedido').innerHTML=`<h2>Mi Pedido </h2>`;
}

function pintarpedido() {
    document.getElementById('pedido').innerHTML="";
    document.getElementById('pedido').innerHTML=`<h2>Mi Pedido </h2>`;
    let contador=0;
    for(let x=0; x<pedido.length;x++){
       
        document.getElementById('pedido').innerHTML+=`
             
            <div><img src="${pedido[x].foto}"></div>
            <div>${pedido[x].nombre}</div>
            <div>${pedido[x].tamano}</div>
            <div>${pedido[x].cantidad}</div>
            <div>${pedido[x].sexo}</div>
            <div>${pedido[x].precio}€</div>
            <div> ${total(`${x}`)}</div>
        `;
        contador+=total(`${x}`);
    }
    document.getElementById("totales").innerHTML=contador+ "€";
}

function pedir(posicion) {
    canti=parseInt(document.getElementById(`numero${posicion}`).innerHTML);
    let valor;
    if(document.getElementById(`tamanop${posicion}`).checked){
        valor=productos[posicion].pequena;
        mitamano='26"'
    }
    if(document.getElementById(`tamanom${posicion}`).checked){
        valor=productos[posicion].mediana;
        mitamano='27,5"'
    }
    if(document.getElementById(`tamanog${posicion}`).checked){
        valor=productos[posicion].grande;
        mitamano='29"'
    }
    if(document.getElementById(`hombre${posicion}`).checked){
        genero="hombre";
    }else{
        genero="mujer";
    }
    
    pedido.push({nombre:productos[posicion].nombre, precio:valor,cantidad:canti, tamano:mitamano, foto:productos[posicion].foto, sexo: genero });
    pintarpedido();
}

function devolvercheck(posicion) {
    if(document.getElementById(`tamanop${posicion}`).checked){
        return productos[posicion].pequena;
    }
    if(document.getElementById(`tamanom${posicion}`).checked){
        return productos[posicion].mediana;
    }
    if(document.getElementById(`tamanog${posicion}`).checked){
        return productos[posicion].grande;
    }
    
}
function suma(posicion) {
    let valor=parseInt(document.getElementById(`numero${posicion}`).innerHTML);
    valor++;
    document.getElementById(`numero${posicion}`).innerHTML=valor;
    document.getElementById(`precio${posicion}`).innerHTML=(valor*devolvercheck(posicion));
}
function resta(posicion){

    let valor = parseInt(document.getElementById(`numero${posicion}`).innerHTML);
    if (valor>1){
     valor--;
    }
    document.getElementById(`numero${posicion}`).innerHTML=valor;
    document.getElementById(`precio${posicion}`).innerHTML=(valor*devolvercheck(posicion));
    
    }


    function total(posicion) {
        return pedido[posicion].precio * pedido[posicion].cantidad;
    }