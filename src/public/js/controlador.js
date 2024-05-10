//El siguiente código es el encargado de generar la informaación de prueba.

let categorias = [];

const getCategories = () => {
  for (let i = 0; i < 5; i++) {
    let nameCategory = "Categoria " + i;
    if (localStorage.getItem(nameCategory) == null) {
      generateCategory(i);
    } else {
      let categoria = JSON.parse(localStorage.getItem(nameCategory));
      categorias.push(categoria);
    }
  }
};

const generateCategory = (number) => {
  console.log('Generando categoria ' + number)
  //Este arreglo es para generar textos de prueba
  let textosDePrueba = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
    "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
    "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
    "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
    "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum.",
  ];

  let contador = 1;
  //Generar 1 categoria
  let categoria = {
    nombreCategoria: "Categoria " + number,
    descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
    aplicaciones: [],
  };
  //ciclo para las apps de cada categoria
  for (let j = 0; j < 10; j++) {
    //Generar 10 apps por categoria
    let aplicacion = {
      codigo: contador,
      nombre: "App " + contador,
      descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
      icono: `img/app-icons/${contador}.webp`,
      instalada: contador % 3 == 0 ? true : false,
      app: "app/demo.apk",
      calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
      descargas: 1000,
      desarrollador: `Desarrollador ${(number +1) * (j + 1)}`,
      imagenes: [
        "img/app-screenshots/1.webp",
        "img/app-screenshots/2.webp",
        "img/app-screenshots/3.webp",
      ],
      comentarios: [
        {
          comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
          fecha: "12/12/2012",
          usuario: "Juan",
        },
        {
          comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
          fecha: "12/12/2012",
          usuario: "Pedro",
        },
        {
          comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
          fecha: "12/12/2012",
          usuario: "Maria",
        },
      ],
    };
    contador++;
    categoria.aplicaciones.push(aplicacion);
  }
  localStorage.setItem(categoria.nombreCategoria, JSON.stringify(categoria));
  categorias.push(categoria);
};

getCategories();
console.log(categorias);

