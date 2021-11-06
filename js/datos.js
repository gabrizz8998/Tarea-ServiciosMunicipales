var almacen = new Array();
var contador = 0;
var pos = 0;
var totalpedido = 0;
class articluoAlmacen {
  constructor(
    codigo,
    descripcion,
    tipo,
    direccion,
    latitud,
    longitud,
    precio,
    duracion
  ) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.precio = precio;
    this.duracion = duracion;
  }
  leerRegistro() {
    return this;
  }
}
function generarTabla(evt) {
  var cuerpoa = document.querySelector("#cuerpoServicios");
  cuerpoa.innerHTML = "";
  var iFamilia = 0;
  if (FamiliaSeleccionada.value != "") {
    var iFamilia = parseInt(FamiliaSeleccionada.value);
  }

  myDBInstance.transaction(function (tran) {
    tran.executeSql("SELECT * FROM servicios", [], function (tran, data) {
      for (i = 0; i < data.rows.length; i++) {
        // alert(data.rows[i].Nombre);
        registroArticulo = new articluoAlmacen(
          data.rows[i].id,
          data.rows[i].Descripcion,
          data.rows[i].Tipo,
          data.rows[i].Direccion,
          data.rows[i].Latitud,
          data.rows[i].Longitud,
          data.rows[i].Precio,
          data.rows[i].Duracion
        );

        if (iFamilia == registroArticulo.tipo || iFamilia == 0) {
          linea = document.createElement("tr");
          botonId = document.createElement("button");
          // En el atributo  del button creado paso el artículo seleccionado pedido
          botonId.registro = registroArticulo;
          botonId.addEventListener("click", VentaArtuiculo, false)
          dato = document.createTextNode(registroArticulo.codigo);
          botonId.appendChild(dato);
          Columna = document.createElement("td");
          Columna.appendChild(botonId);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.descripcion);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.precio);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.duracion);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          parrafo = document.createElement("p");
          dato = document.createTextNode(registroArticulo.direccion);
          Columna = document.createElement("td");
          Columna.appendChild(dato);
          linea.appendChild(Columna);

          cuerpoa.appendChild(linea);
        }
      }
    });
  });
}

function VentaArtuiculo(event) {
  // posicionIndice = this.alt;
  // alert(this.getAttribute("precioArticulo"));
  var articuloventa = this.registro; //new objetoArticulo();
  //  alert(articuloventa.precio)
  // articuloventa = almacen[posicionIndice];
  // alert(articuloventa.nombre)

  var cuerpop = document.querySelector("#cuerpoPedido");

  linea = document.createElement("tr");

  botonId = document.createElement("button");
  // En el atributo  del button creado paso el artículo seleccionado pedido
  botonId.registro = articuloventa;
  botonId.articulo=articuloventa;
  botonId.addEventListener("click", visualizaMapa, false)
  dato = document.createTextNode(articuloventa.codigo);
  botonId.appendChild(dato);
  Columna = document.createElement("td");
  Columna.appendChild(botonId);
  linea.appendChild(Columna);

  dato = document.createTextNode(articuloventa.descripcion);
  Columna = document.createElement("td");
  Columna.appendChild(dato);
  linea.appendChild(Columna);

  parrafo = document.createElement("p");
  dato = document.createTextNode(articuloventa.precio);
  Columna = document.createElement("td");
  Columna.appendChild(dato);
  linea.appendChild(Columna);

  ccantidad = document.createElement("input");
  ccantidad.registro = articuloventa;
  ccantidad.id = "c";
  Columna = document.createElement("td");
  Columna.appendChild(ccantidad);
  ccantidad.addEventListener("keyup", calculoimporte, false);
  linea.appendChild(Columna);

 

  pimporte = document.createElement("input");
  pimporte.value = 0;
  Columna = document.createElement("td");
  Columna.appendChild(pimporte);
  linea.appendChild(Columna);

  cuerpop.appendChild(linea);
  cargarMapa(articuloventa.latitud,articuloventa.longitud);
  event.target.removeEventListener("click",VentaArtuiculo,false)
}



function calculoimporte() {
    // var articulos_venta=new Array();
    articuloventa = this.registro;
    var precio = articuloventa.precio;
    var cantidad = this.value
    var importeLinea = parseFloat(precio) * parseFloat(cantidad);

    var lineaPadre = this.parentElement.parentElement;
   
    var hijosVentaPedido = lineaPadre.childNodes;
   
    var importelinea = hijosVentaPedido[4].firstChild;

    var importeAnterior = parseFloat(importelinea.value);
    importelinea.value = importeLinea
    if (isNaN(importelinea.value)) {
        importelinea.value = '0';
    }
    if (isNaN(totalpedido)) {
        totalpedido = 0;
    }
    totalpedido = totalpedido + importeLinea - importeAnterior;
    var ctotal = document.querySelector("#total");
    ctotal.value = totalpedido;

}