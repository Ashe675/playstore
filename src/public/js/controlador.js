//El siguiente código es el encargado de generar la informaación de prueba.
const categoryFilter = document.getElementById('category-filter');
const AppsContainer = document.getElementById('apps-container');
const appNameModal = document.getElementById('app-name-modal');
const appDevModal = document.getElementById('app-dev-modal');
const appDescModal = document.getElementById('app-description-modal');
const appIconModal = document.getElementById('app-icon-modal');
const appQualifiModal = document.getElementById('app-qualification-modal');
const appCarouselModal = document.getElementById('app-carousel-modal');
const appCommentsModal = document.getElementById('app-comments-modal');
const modalApp = document.getElementById('modalApp');


let contadorApps = 1;
let categorias = [];
let categorySelected = {};
let indexCategorySelected = -1;
let appSelected = {};

getCategories();
fillSelectFilter();
renderApps();
console.log(categorias);

function getCategories(){
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

function generateCategory(number){
  console.log('Generando categoria ' + number)
  //Este arreglo es para generar textos de prueba
  let textosDePrueba = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
    "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
    "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
    "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
    "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum.",
  ];

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
      codigo: contadorApps,
      nombre: "App " + (contadorApps),
      descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
      icono: `img/app-icons/${contadorApps}.webp`,
      instalada: contadorApps % 3 == 0 ? true : false,
      app: "app/demo.apk",
      calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
      descargas: 1000,
      desarrollador: `Desarrollador ${(number +1) * (contadorApps)}`,
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
    contadorApps++;
    categoria.aplicaciones.push(aplicacion);
  }
  localStorage.setItem(categoria.nombreCategoria, JSON.stringify(categoria));
  categorias.push(categoria);
};

function fillSelectFilter(){
  let HTMLCode = ''
  let cont = 0;
  categorias.forEach(categoria =>{
    HTMLCode += `
    <option value="${cont}">${categoria.nombreCategoria}</option>
    `
    cont++;
  });
  categoryFilter.innerHTML += HTMLCode;
}

function renderApps(){
  AppsContainer.innerHTML = '';
  let HTMLCode = ``;
  if(indexCategorySelected < 0 || indexCategorySelected > categorias.length || !indexCategorySelected){
    categorias.forEach(categoria =>{
      categoria.aplicaciones.forEach(app=>{
        HTMLCode += `
        <div class="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6">
        <div class="card app-card" data-id="${app.codigo}">
          <div class="card__img-container">
            <img
              src="${app.icono}"
              class="card-img-top"
              alt="logo app"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">${app.nombre}</h5>
            <p class="card-text">${app.desarrollador}</p>
            <p class="card-quality">
              ${generateStars(app.calificacion)}
            </p>
          </div>
        </div>
      </div>
        `
      });
    });
  }else{
    categorySelected.aplicaciones.forEach(app=>{
      HTMLCode += `
      <div class="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6">
      <div class="card app-card" data-id="${app.codigo}">
        <div class="card__img-container">
          <img
            src="${app.icono}"
            class="card-img-top"
            alt="logo app"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">${app.nombre}</h5>
          <p class="card-text">${app.desarrollador}</p>
          <p class="card-quality">
            ${generateStars(app.calificacion)}
          </p>
        </div>
      </div>
    </div>
      `
    });
  }
  AppsContainer.innerHTML += HTMLCode;
}

function generateStars(calificacion){
  let HTMLCode = ``;
  for (let i = 0; i < calificacion; i++) {
    HTMLCode += `<i class="fa-solid fa-star"></i>`
  }
  for (let i = 0; i < (5 - calificacion); i++) {
    HTMLCode += `<i class="fa-regular fa-star"></i>`
  }
  return HTMLCode;
}

categoryFilter.addEventListener('change',changeCategory);

AppsContainer.addEventListener('click',selectApp);

function changeCategory(){
  indexCategorySelected = this.value;
  categorySelected = categorias[indexCategorySelected];
  console.log(categorySelected);
  renderApps();
}

function selectApp(e){
  let element = e.target.closest(".app-card");
  if(element){
    let id = parseInt(element.getAttribute('data-id'));
    findApp(id);
    if(appSelected){
      changeInfoModal();
      showModal();
    }
  }
}

function showModal(){
  let modalBootstrap = new bootstrap.Modal(modalApp);
  modalBootstrap.show();
}

function findApp(id){
  categorias.find(categoria=>{
    appSelected = categoria.aplicaciones.find(app=>app.codigo === id);
    return appSelected
  });
}

function changeInfoModal(){
  appIconModal.src = appSelected.icono;
  appNameModal.textContent = appSelected.nombre;
  appDevModal.textContent = appSelected.desarrollador;
  appDescModal.textContent = appSelected.descripcion;
  let HTMLCode = '';
  HTMLCode = generateStars(appSelected.calificacion);
  appQualifiModal.innerHTML = HTMLCode;
  if(appSelected.calificacion <= 2){
    appQualifiModal.classList.add('red');
    appQualifiModal.classList.remove('item2');
  }else{
    appQualifiModal.classList.add('item2');
    appQualifiModal.classList.remove('red');
  }
  HTMLCode = '';
  for (let i = 0; i < appSelected.imagenes.length; i++) {
    HTMLCode += 
    `<div class="carousel-item active">
    <img
      src="${appSelected.imagenes[i]}"
      class="d-block w-100"
    />
    </div>`;
    
  };
  appCarouselModal.innerHTML = HTMLCode;
  HTMLCode = '';
  appSelected.comentarios.forEach(comment =>{
    HTMLCode += 
    `<li class="list-group-item comment-item">
    <div class="user-img">
      <img src="img/user.webp" alt="">
    </div>
    <div class="user-info">
      <h6 class="username">${comment.usuario}</h6>
      <p class="user-comment">
        ${comment.comentario}
      </p>
    </div>
  </li>`
  })
  appCommentsModal.innerHTML = HTMLCode;

}