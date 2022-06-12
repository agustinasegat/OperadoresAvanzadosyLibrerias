//Va a seleccionar el div con id productos para generar el catálogo
const productos = document.querySelector('#productos');
//Va a seleccionar el div con id carrito para armar el carrito
const carritoCompra = document.querySelector('#carrito');
//Va a seleccionar el boton total para ver el precio en carrito
const verTotal = document.querySelector('#total');
//Va a seleccionar el boton vaciar para vaciar el carrito
const btnVaciar = document.querySelector('#boton-vaciar');
//variable LS
const LocalStorage = localStorage;


//alerts
function msjSwal(mensaje){
  //USO DE OPERADOR AND PARA INDICAR CON UN ALERT QUE EL CARRITO ESTÁ VACÍO
    Swal.fire({
    customClass: {
    confirmButton: 'swalBtnColor'},
    title: mensaje})}


//Toasts
function toast(mensaje){
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true,
    style: {
      background: "#86cad6",
    },
  }).showToast();
}

//Creamos el carrito con un Array
let carrito = []
 
//Guardar en Local Storage
function guardarEnLocalStorage() {
  LocalStorage.setItem('carrito', JSON.stringify(carrito));
}


//Busca si hay productos en Local
function cargarenLocalStorage () {
    // USO DE OPERADOR OR: si el carrito tiene productos va a devolverlos y al abrirse la página muestra un msj
   LocalStorage.getItem('carrito') === null||(carrito = JSON.parse(LocalStorage.getItem('carrito')), msjSwal("¡Tenés productos esperándote en tu carrito!"));
}
  


//Función Agregar productos al Carrito
function agregarAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
   // Actualizamos el carrito 
    actualizarCarrito()
    // Se guarda en  Local Storage
    guardarEnLocalStorage()  
    //USO DE OPERADOR AND PARA INDICAR QUE SE HA AGREGADO UN PRODUCTO AL CARRITO
    carrito!=0 && toast("¡Producto agregado al carrito!")};
 
 
 
//Va a generar los productos que están en el catálogo
function armarCatalogo(){
catalogo.forEach((producto) => {
  //DESESTRUCTURACIÓN DE OBJETOS
  const {id, item, imagen,material, medida,precio} = producto ;
  // Estructura
  const Container = document.createElement('div');
  Container.classList.add('card-mod', 'col-sm-4', 'ml-5');
   // Card Body
   const ContainerCard = document.createElement('div');
   ContainerCard.classList.add('card-body');
   // Nombre
   const nombre = document.createElement('h5');
   nombre.classList.add('card-title','text-center');
   nombre.textContent = item+" "+medida+" "+material
   // Imagen
   const Imagen = document.createElement('img');
   Imagen.classList.add('img-fluid');
   Imagen.setAttribute('src', imagen);
   // Precio
   const Precio = document.createElement('p');
   Precio.classList.add('card-text','text-center');
   Precio.textContent = "$"+precio;
   // Boton 
   const Boton = document.createElement('button');
   Boton.classList.add('btn-Add');
   Boton.textContent = '¡Lo Quiero!';
   Boton.setAttribute('marcador', id);
   Boton.addEventListener('click', agregarAlCarrito);
   // Insertamos todo en HTML
   ContainerCard.appendChild(Imagen);
   ContainerCard.appendChild(nombre);
   ContainerCard.appendChild(Precio);
   ContainerCard.appendChild(Boton);
   Container.appendChild(ContainerCard);
   productos.appendChild(Container);})
  }


function actualizarCarrito() {
   carritoCompra.textContent = '';
    // Evitamos que generen duplicados
    const carritoSinDuplicados = [...new Set (carrito)];
    // Generamos cada uno de los productos que van a ir dentro del carrito
    carritoSinDuplicados.forEach((id) => {
    const producto = catalogo.filter((itemCatalogo) => {
    return itemCatalogo.id === parseInt(id);});
    // Cuenta la cantidad de productos agregados
    const cantidad = carrito.reduce((total, IDproducto) => {
    return IDproducto === id ? total+=1 : total;}, 0);
    const itemCarrito = document.createElement('li');
    itemCarrito.classList.add('list-group-item', 'text-right', 'mx-2');
    itemCarrito.textContent = `${cantidad} x ${producto[0].item} - $${producto[0].precio}`;
    // Boton de borrar
    const btnBorrar = document.createElement('button');
    btnBorrar.classList.add('btn-borrar','fa-solid', 'fa-trash-can','mx-5');
    btnBorrar.textContent = '';
    btnBorrar.dataset.item = id;
    btnBorrar.addEventListener('click', borrarProducto);
    // Agregamos al HTML
    itemCarrito.appendChild(btnBorrar);
    carritoCompra.appendChild(itemCarrito);});
    //Calcula el Total
    verTotal.innerHTML= calcularTotal()}

//Borra Producto
function borrarProducto(evento) {
   const id = evento.target.dataset.item;
   // Borramos todos los productos
   carrito = carrito.filter((carritoId) => {
       return carritoId !== id;});
    // volvemos a actualizar
    actualizarCarrito();
    // Actualizamos el LocalStorage
    guardarEnLocalStorage();
    // USO DE OPERADOR AND: Mensaje para el caso en que se vacíe el carrito
    carrito.length===0 && msjSwal("¡El carrito está vacio!")
}


// Calcular Total
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const producto = catalogo.filter((productoenCatalogo) => {
            return productoenCatalogo.id === parseInt(item);});
         // Los sumamos al total
                return total + producto[0].precio;}, 0);}

// Vaciar Carrito
function vaciarCarrito(){
   // Limpiamos los productos guardados
       carrito = [];
      // Actualizamos
          actualizarCarrito();
            // Borra LocalStorage 
            localStorage.clear() 
            //OPERADOR AND: indica que el carrito está vacío
            carrito.length===0 && msjSwal("¡El carrito está vacio!")
            }

btnVaciar.addEventListener('click',vaciarCarrito)


//Cuando se cierra la ventana y se vuelve a abrir busca si hay productos en local y los agrega al carrito
cargarenLocalStorage()
armarCatalogo()
actualizarCarrito()

//---------------------------------FORMULARIO---------------------------------------------//

//---------------------------DATOS PERSONALES-----------------------------------//

//Función para validar que todos los datos del formulario estén completos
const validacionFormulario = (e) => {
    e.preventDefault();
    if (nombre.value ==="" || apellido.value ==="" || domicilio.value ==="" || telefono.value ===""|| email.value ===""|| tarjeta.value ===""|| vto.value ===""|| codigo.value ===""){
      error()
      return false;
    }
   
    return Enviado()
  }
  
//Mensaje de error por si falta algún dato
  function error() {
      Swal.fire({
        customClass: {
          confirmButton: 'swalBtnColor'},
        title: "¡Completá todos los datos para continuar!",
        icon: 'error'
      })
    }
    
  
//Mensaje de envío exitoso. Se limpia el formulario y se vacía el carrito
function Enviado(){
  Swal.fire({
    customClass: {
      confirmButton: 'swalBtnColor'},
    title: "¡Gracias por tu compra!",
    icon: 'success'})
    limpiarFormulario()}
  
//Limpia los datos del Formulario
function limpiarFormulario() {
    document.getElementById("form").reset();
}

//Definimos qué va a pasar cuando se cliquee en enviar
const submit = document.getElementById("btn-enviar");
submit.addEventListener('click', validacionFormulario);


//---------------------------CÁLCULO DEL PRECIO DE ENVÍO-----------------------------------//
         
//Calcula el precio total con envío al hacer click en el botón calculadora
let conEnvio =document.getElementById("calcularEnvio")
conEnvio.addEventListener("click", ()=>{
    
//Precio (lo toma del carrito)
  sacarprecio=calcularTotal()
  let precio= parseInt(sacarprecio)

  //Variables por zona
    let CABA=800
    let GBA=1500
    let Interior=3000
  
    //Toma el lugar ingresado por el usuario
    let envio = document.getElementById("envio").value


    //Función para que calcule el precio según el lugar de envío y lo devuelva con mensaje
    function SumaEnvio(numero1, numero2){
      totalEnvio=(numero1+numero2)
      msjSwal(" El costo de envío es $"+numero2+"."+ "\n El precio final con envío es"+ " " +"$"+totalEnvio+".")}

      function CostoporZona(){
      switch (envio){
      case("CABA"): 
      SumaEnvio(precio, CABA)
      break;
      case "GBA":
      SumaEnvio(precio, GBA)
      break;
      case "Interior":
      SumaEnvio(precio, Interior)
      break;
      default : 
      error () ;}}


     //OPERADOR AND Va a calcular el precio de envío siempre y cuando haya productos en Carrito, caso contrario va a dar un mensaje
     (precio !=0) ? CostoporZona() : msjSwal("Agregá productos al Carrito")
    
  
    })



//---------------------------CÁLCULO CUOTAS-----------------------------------//

//Calcula las cuotas al hacer click en el botón calculadora
let calcular =document.getElementById("calcular")
calcular.addEventListener("click",()=>{

// Tasa de interés por cuota
  const interes = 0.05

  //Cuota
  let sacarcuotas =document.getElementById("cuotas").value
  let cuotas= parseInt(sacarcuotas)

  // USO DE OPERADOR TERNARIO. Cuando se ingresen entre 2 y 6 cuotas va a calcular el valor de cada una 
   cuotas >=2 ? msjSwal("Pagarás"+" "+cuotas +" "+"cuotas de"+" "+"$"+((totalEnvio+ (totalEnvio*interes))/cuotas)+" "+"mensuales"): msjSwal("Pagarás"+" "+"$"+totalEnvio+" " + "sin interés")
   

})



  