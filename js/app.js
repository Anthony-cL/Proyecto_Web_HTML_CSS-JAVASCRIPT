

// Variables
// Arrays

let carritoDeCompras = [];
let listaDeProductos = [];
let tabla;

// Fetch Promesa


fetch("../js/productos.json")
  .then(response => response.json())
  .then(data => {
    listaDeProductos = data; // Se asigna el array de productos al arreglo vacío.
  })
  .catch(error => console.error(error));

// Local Storage

window.addEventListener('load', () => {
  tabla = document.querySelector('#tablaCarrito');
  if (localStorage.getItem('carrito')) {
    carritoDeCompras = JSON.parse(localStorage.getItem('carrito'));
    carritoDeCompras.forEach(producto => agregarFilaCarrito(producto));
  }
});

// Clase Constructora

class ComidaMascota {
  constructor(id, nombre, marca, kilos, valor) {
      this.id = id;
      this.nombre = nombre;
      this.marca = marca;
      this.kilos = kilos;
      this.valor = valor;
  }
}

// Funciones

function agregarAlCarrito(id) {
  let productoEncontrado = listaDeProductos.find(producto => producto.id === id);
  if (productoEncontrado) {
    const index = carritoDeCompras.findIndex(producto => producto.id === id);

    if (index >= 0) {
      // Si el producto ya está en el carrito, actualizar la cantidad en lugar de agregar una nueva fila

      const cantidadActual = parseInt(tabla.rows[index+1].cells[5].textContent);
      tabla.rows[index+1].cells[5].textContent = cantidadActual + 1;
      carritoDeCompras[index].cantidad += 1;

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })

    } else {

      // Si el producto no está en el carrito, agregar una nueva fila

      carritoDeCompras.push({...productoEncontrado, cantidad: 1});
      agregarFilaCarrito({...productoEncontrado, cantidad: 1});
      document.querySelector("#mensaje_carrito").textContent = "Uno o mas productos han sido Agregados!.";

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Producto Agregado Al Carrito'
      })

      // Se Actualiza el Local Storage 
      localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
    }

  } else { 

    // En caso de no existir un producto con un ID invalido, mostrara un error por consola.
    console.log(`El producto con id ${id} no existe.`);
  }
}

function agregarFilaCarrito(comida) {
    const fila = tabla.insertRow(-1);
    
    const celdaID = fila.insertCell(0);
    celdaID.textContent = comida.id;
    fila.setAttribute('data-id', comida.id);
    
    // Celda que muestra el nombre de la comida de gato o perro
    const celdaNombre = fila.insertCell(1);
    celdaNombre.textContent = comida.producto;
    
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

    
function eliminarFilaCarrito(index) {
    tabla.deleteRow(index+1);
}

function eliminarProducto(id) {
    const index = carritoDeCompras.findIndex(producto => producto.id == id);
    if (index >= 0) {
      eliminarFilaCarrito(index);
      carritoDeCompras.splice(index, 1);
      
      // Se cambia el texto mostrando que uno o mas productos fueron eliminados.
      document.querySelector("#mensaje_carrito").textContent = "Uno o mas productos han sido eliminados."; 
  
      // Se Actualiza el Local Storage
      localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
      
      // Recorrer las filas de la tabla y actualizar la columna "cantidad"
      const filas = tabla.rows;
      for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const idProducto = parseInt(fila.getAttribute('data-id'));
        const cantidad = carritoDeCompras.filter(producto => producto.id === idProducto).length;
        const celdaCantidad = fila.cells[5];
        celdaCantidad.textContent = cantidad;
      }

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Se ha Eliminado un producto'
      })
      
    } else {
      console.log(`El producto con ID ${id} no se encuentra en el carrito.`);
    }
  }

