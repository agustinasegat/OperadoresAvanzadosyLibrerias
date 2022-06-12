//Creamos la clase producto
class producto{
    constructor (id, item, imagen, material, medida, precio){
    this.id=id;
    this.item = item;
    this.imagen =imagen;
    this.material= material;
    this.medida = medida;
    this.precio = precio;
    this.cantidad = 1}

}

//Creamos Array Catálogo y le añadimos los productos
    const catalogo=
    [{
        "id": 1,
        "item": "Cajonera",
        "imagen":"./images/cajonera.jpg",
        "material": "Paraíso laqueado con correderas metálicas",
        "medida": "120x47x120cm",
        "precio":  45000
    },
    {
        "id": 2,
        "item": "Sillón",
        "imagen": "./images/zigzag.jpg",
        "material": "Pana antimanchas Estampado Zig Zag",
        "medida": "75x65x70cm",
        "precio":  28000
    },
   
    {
        "id": 3,
        "item": "Silla Eames",
        "imagen": "./images/silla.jpg",
        "material": "Patas de madera",
        "medida": "82x52x49cm",
        "precio":  8000
    },
   
    {
        "id": 4,
        "item": "Sofá dos cuerpos",
        "imagen": "./images/sofa.jpg",
        "material": "Pana con estructura metálica",
        "medida": "82x75x152",
        "precio":  55000
    },

    {
        "id": 5,
        "item": "Mesa comedor",
        "imagen": "./images/mesa.jpg",
        "material": "Madera Paraíso",
        "medida": "73x80x120",
        "precio":  39000
    },

    {
        "id": 6,
        "item": "Mesa ratona",
        "imagen":  "./images/ratona.jpg",
        "material": "Madera Paraíso",
        "medida": "90x50x45cm",
        "precio":  19000
    }
]
