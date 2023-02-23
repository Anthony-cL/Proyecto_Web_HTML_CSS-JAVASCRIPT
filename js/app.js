
// Los Console log que tengo son para probar errores //


// Local Storage //

window.addEventListener('load', () => {
  if (localStorage.getItem('carrito')) {
    carritoDeCompras = JSON.parse(localStorage.getItem('carrito'));
    carritoDeCompras.forEach(producto => agregarFilaCarrito(producto));
  }
});

// Variables //

let carritoDeCompras = [];
let listaDeProductos = [];
let tabla = document.querySelector('#tablaCarrito');


// Clase Constructora //

class ComidaMascota {
  constructor(id, nombre, marca, kilos, valor) {
      this.id = id;
      this.nombre = nombre;
      this.marca = marca;
      this.kilos = kilos;
      this.valor = valor;
  }

}


// Funcion para agregar al carrito //


function agregarAlCarrito(id) {
  let productoEncontrado = listaDeProductos.find(producto => producto.id === id);
  if (productoEncontrado) {
    const index = carritoDeCompras.findIndex(producto => producto.id === id);
    if (index >= 0) {

      // Si el producto ya está en el carrito, actualizar la cantidad en lugar de agregar una nueva fila
      const cantidadActual = parseInt(tabla.rows[index+1].cells[5].textContent);
      tabla.rows[index+1].cells[5].textContent = cantidadActual + 1;
      carritoDeCompras[index].cantidad += 1;

    } else {

      // Si el producto no está en el carrito, agregar una nueva fila
      carritoDeCompras.push({...productoEncontrado, cantidad: 1});
      agregarFilaCarrito({...productoEncontrado, cantidad: 1});

      console.log(`El producto ${productoEncontrado.nombre} ha sido agregado al carrito.`);
      document.querySelector("#mensaje_carrito").textContent = "Uno o mas productos han sido Agregados!.";

      localStorage.setItem('carrito', JSON.stringify(carritoDeCompras)); // Se Actualiza el Local Storage 
    }
  } else { 

    // En caso de no existir un producto con un ID invalido, mostrara un error por consola.
    console.log(`El producto con id ${id} no existe.`);
  }
}

// Funcion que crea las Filas en la Pagina HTML


function agregarFilaCarrito(comida) {
  const fila = tabla.insertRow(-1);
  
  const celdaID = fila.insertCell(0);
  celdaID.textContent = comida.id;
  fila.setAttribute('data-id', comida.id);
  
  // Celda que muestra el nombre de la comida de gato o perro
  const celdaNombre = fila.insertCell(1);
  celdaNombre.textContent = comida.nombre;
  
  // Celda que muestra la marca del mismo
  const celdaMarca = fila.insertCell(2);
  celdaMarca.textContent = comida.marca;
  
  // Celda que muestra los Kilos 
  const celdaKilos = fila.insertCell(3);
  celdaKilos.textContent = comida.kilos;
  
  // Celda que muestra el valor de la comida

  const celdaValor = fila.insertCell(4);
  celdaValor.textContent = `$ ${comida.valor}`;

  // Celda que muestra la cantidad de un producto
  
  const celdaCantidad = fila.insertCell(5);
  celdaCantidad.textContent = 1;
  
  // Se crea un boton especial para borrar la fila de un producto(por ahora incluye toda la cantidad de productos.)
  const celdaEliminar = fila.insertCell(6);
  const botonEliminar = document.createElement('button');

  // Se le da dos clases al boton para que se vea Afectado por Bootstrap
  botonEliminar.classList.add("btn", "btn-danger");
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.setAttribute('data-id', comida.id);
  celdaEliminar.appendChild(botonEliminar);

  // Se crea el evento y se da el atributo ID

  botonEliminar.addEventListener('click', () => {
      eliminarProducto(botonEliminar.getAttribute('data-id'));
  });
}


// funcion que elimina las filas


function eliminarFilaCarrito(index) {
  tabla.deleteRow(index+1);
}

// Funcion para eliminar productos "Los Console Log son para probar que funcione, un extra"

function eliminarProducto(id) {
  const index = carritoDeCompras.findIndex(producto => producto.id == id);
  if (index >= 0) {
    eliminarFilaCarrito(index);
    carritoDeCompras.splice(index, 1);
    console.log(`El producto con ID ${id} ha sido eliminado del carrito.`);
    document.querySelector("#mensaje_carrito").textContent = "Uno o mas productos han sido eliminados."; // Se cambia el texto mostrando que uno o mas productos fueron eliminados.

    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras)); // Se Actualiza el Local Storage
    
    // Recorrer las filas de la tabla y actualizar la columna "cantidad"
    const filas = tabla.rows;
    for (let i = 1; i < filas.length; i++) {
      const fila = filas[i];
      const idProducto = parseInt(fila.getAttribute('data-id'));
      const cantidad = carritoDeCompras.filter(producto => producto.id === idProducto).length;
      const celdaCantidad = fila.cells[5];
      celdaCantidad.textContent = cantidad;
    }
    
  } else {
    console.log(`El producto con ID ${id} no se encuentra en el carrito.`);
  }
}
// Los Objetos  

const comida1 = new ComidaMascota(1 ,"Comida para gato Indoor","Equilibrio","3KG",7000);
const comida2 = new ComidaMascota(2,"Comida para gato Indoor","Equilibrio","6KG",14000);
const comida3 = new ComidaMascota(3,"Comida para gatitos","Naturalis","3KG", 5000);
const comida4 = new ComidaMascota(4,"comida para perro","Alaska","15KG",20000);
const comida5 = new ComidaMascota(5,"Comida para gato control de pelo","Hills","3KG",8000);
const comida6 = new ComidaMascota(6,"comida para gato control de pelo","Hills","6KG",15000);
const comida7 = new ComidaMascota(7,"comida para gato control de pelo","Hills","9KG",21000);
const comida8 = new ComidaMascota(8,"comida para gato Indoor","Hills","3KG",5000);
const comida9 = new ComidaMascota(9,"comida para perro articular","Mv","10KG",22000);
const comida10 = new ComidaMascota(10,"comida para perro cardio","Mv","10KG",23000);

// Push de Objetos a la lista de productos

listaDeProductos.push(comida1, comida2, comida3, comida4, comida5, comida6, comida7, comida8, comida9, comida10);
