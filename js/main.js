/*
Menú de ADMIN para cargar cursos y tarjetas.
Menú de Invitado para comprar.

El objetivo es cargar primero los cursos y tarjetas usando la opción 1 (Admin), para luego comprar un producto
con tarjeta o trasnferencia. También se pueden listar cursos, mostrar los menores a un precio ingresado y eliminar un curso.

*/

const courses=[];
const cards=[];


class Card{
  constructor(banco, tipo, cuotas, interes){
    this.banco=banco;
    this.tipo=tipo;
    this.cuotas = cuotas;
    this.interes = interes;
  }

  mostrarCuotas(){
    return this.cuotas;
  }

  mostrarInteres(){
    return this.interes;
  }

  mostrarDatos(){
    return "Tarjeta del banco " + this.banco + " de " + this.tipo + ", interés de " + this.interes +"% mensual. Cantidad de cuotas: " + this.cuotas;
  }  
}

const card1 = new Card("bancor","credito",5,10);
const card2 = new Card("naranja","credito",4,20);
const card3 = new Card("galicia","debito",6,30);

const cardsLoad=[];
cardsLoad.push(card1,card2,card3);

const coursesLoad = [
  {id: 1, title:"Introducción a PNL",teacher:"Daniel Carrizo",price:5000},
  {id: 2, title:"Inteligencia emocional práctica",teacher:"Daniel Carrizo",price:4000},
  {id: 3, title:"Teatro para la vida",teacher:"Hector Alem",price:5000},
  {id: 4, title:"Introducción al Coaching con PNL",teacher:"Daniel Carrizo",price: 4500},
  {id: 5, title:"Mindfulness",teacher:"Laura Dalama",price:5000}
];


function Course(title, teacher, price){
  this.id = courses.length + 1;
  this.title = title;
  this.teacher = teacher;
  this.price = price;
}

function menuAdmin(){
  let optionAdmin=prompt("Elija la opción que desea: 1.- Gestión de Cursos / 2.- Cargar tarjetas / 0.- Salir");

  while(optionAdmin != 0){
    if(optionAdmin==1){
      menu(courses);
    }else{
      addCards(cards);
    }
    optionAdmin=prompt("Elija la opción que desea: 1.- Gestión de Cursos / 2.- Cargar tarjetas / 0.- Salir");
  }    
}  

function addCards(cards){
  let option=true;
  
  while(option){
    let newBank = prompt("Ingrese nombre de entidad bancaria: ");
    let newtype = prompt("Tipo (Débito/Crédito): ");
    let newCuota = prompt("Cantidad de cuotas: ");
    let newInteres = prompt("Interes mensual (%): ");
    let card = new Card(newBank,newtype,newCuota,newInteres);
    cards.push(card);
    alert("Se guardó correctamente");
    console.log(cards)
    option=validate();
  }
  alert("Usted ingresó " + cards.length + " tarjetas.")
}

function menu(courses){
  let optionMenu=prompt("Elija la opción que desea: 1.- Carga inicial de Cursos / 2.- Eliminar Curso / 3.- Agregar curso/ 4.- Listar Cursos");

  while(optionMenu != 0){
    switch (optionMenu) {
      case "1":
        initial(courses);
        break;
      case "2":
        deleteCourse(courses);
        break;
      case "3":
        addCourse(courses);
        break;
      case "4":
        listCourses(courses);
        break;
      default:
        alert(optionMenu + " no es una opción válida");
        break;
    }
    optionMenu=prompt("Elija la opción que desea: 1.- Cargar inicial de Cursos / 2.- Eliminar Curso / 3.- Cargar curso / 4.- Listar Cursos");
  }
}

function initial(courses){
  let option = true;

  while(option){
    let newTitle = prompt("Ingrese el nombre del curso: ");
    let newPrice = prompt("Ingrese el precio del curso: ");
    let newTeacher = prompt("Ingrese el nombre del responsable del curso: ");

    const newCourse = new Course(newTitle,newTeacher,newPrice);
    courses.push(newCourse);
    alert("El curso "+ newTitle +" se grabó con éxito");
    option = validate();
  }
  alert("Usted cargó "+ courses.length.toString() + " cursos")
}


function addCourse(){
  let newTitle = prompt("Ingrese el nombre del curso: ");
  let newPrice = prompt("Ingrese el precio del curso: ");
  let newTeacher = prompt("Ingrese el nombre del responasable del curso: ");
  const newCourse = new Course(newTitle,newTeacher,newPrice);
  courses.push(newCourse);
  alert("El curso "+ newTitle +" se grabó con éxito");
}

//Elimina el curso ingresando el número de curso.
function deleteCourse(courses){ 
  let deleteItem = prompt("Ingrese el número del curso a borrar: ");

  const indice = courses.findIndex((elemento, indice) => {
    if (elemento.id == deleteItem) {
      return true;
    }
  });

  if(indice != -1){
    courses.splice(indice,1);
    alert("Se eliminó correctamente.")
  }else{
    alert("No existe el id del curso ingresado.")
  }  
}

//Lista todos los cursos.
function listCourses(arr){
  console.log(arr);
  if(arr.length>0){
    for (const el of arr){
      console.log(el);
    }
  }else{
    alert("No hay elementos para mostrar.")
  }  
}

//Filtrar por precio menor
function priceFilterMinor(arr,filter){

  console.log(arr);
  return arr.filter((el)=>{
    return el.price<filter;
  })
}

//Filtrar por nombre (FILTER) - Devuelve array de elementos que poseen ese nombre
function coursesFilterByName(arr,filter){
  const coursesFilterByName=arr.filter((el)=>{
      return el.title.toLowerCase().includes(filter.toLowerCase())
  })
  return coursesFilterByName;
}

//Filtrar por nombre (Finder) - Devuelve array de elementos que poseen ese nombre
function cardsFilterByName(arr,filter){
  const cardsFilterByName=arr.filter((el)=>{
      return el.title.toLowerCase().includes(filter.toLowerCase())
  })
  return cardsFilterByName;
}

function login(){
  let option = prompt("si es administrador ingrese 1, si va a comprar ingrese 2. Para salir presione 0");
  
  while(option != 0){
    if(option == 1){
      menuAdmin()
    }else{
      menuInvitado(courses)
    }
    option = prompt("Administrador ingrese 1 \n Comprador ingrese 2 \n Para salir ingrese 0");
  }
  
}

function menuInvitado(courses){
  let option = true;
  let choice =0;

  while(option){
    alert("1.- Filtrar por nombre de curso \n 2.- Filtrar por menor precio \n 3.- Listar Cursos \n 4.-Comprar \n 0.- SALIR")
    choice = prompt("Ingrese la opción: ");
   
    switch (choice) {
      case "1":
        let curso = prompt("Ingrese el curso que desea buscar: ");
        const finded = coursesFilterByName(courses, curso);
        console.log(finded);
        break;
      case "2":
        let price = prompt("Se listarán los cursos con precios menores al importe que ingrese: $"); 
        alert(courses.length);
        const filtrado = priceFilterMinor(courses,parseFloat(price));
        console.log(filtrado);
        break;
      case "3":
        listCourses(courses);
        break;
      case "4":        
        buyCourse(courses);
        break;
      default:
        alert(choice + " no es una opción válida");
        break;
    }
    option = validate();
  }
}

function buyCourse(courses){
  let buy = prompt("Ingrese el id del curso a comprar: ");

  const indice = courses.findIndex((elemento, indice) => {
    if (elemento.id == buy){
      return true;
    }
  });

  if(indice != -1){
    alert("El curso " + courses[indice].title + " tiene un precio de " + courses[indice].price +" pesos.\n" )
    pay(courses[buy-1].price, cards);
    if(validate()){
      login();
    }else{
      alert("Gracias por usar el simulador");
    }
  }else{
    alert("No existe el id del curso ingresado.")
  } 
}

function pay(price, cards){
  let balance = 0;
  balance = price;
  let payAmount = 0;
  let payForm = prompt("Debe pagar: $" + balance + "- Las formas de pago son: 1. Tarjeta / 2.Transferencia: "); 
  let cardInput;

  if(payForm == 1){
    if(cards.length > 0){
      console.log("Las tarjeta con las que puede pagar son: ");
      alert("tamaño: " + cards.length)
      listCourses(cards);
      let pass = true;
      
      while(pass){
        cardInput = prompt("Ingrese el nombre de la tarjeta con la cual desea pagar: ");

        let cardFinded = cards.find(function(card) {
          return card.banco == cardInput;
        })

        if(cardFinded != undefined){
          pass= false;
          console.log("se va a aplicar un interés del " + cardFinded.interes + "%.");
          balance = parseFloat(balance) + parseFloat(balance*cardFinded.interes/100);
          console.log("Gracias por su compra! \n El nuevo total a pagar es: " + balance + " en " + cardFinded.cuotas + " cuotas de " + (balance/cardFinded.cuotas) + " por mes.");
        }else{
          alert("No existe la tarjeta " + cardInput + " vuelva a ingresar.");
        } 
      }
    }
  }else if(payForm == 2){
    payAmount = prompt("Ingrese importe a pagar en efectivo: ");
    
    if(payAmount>balance){
      alert("Gracias por su compra, su vuelto es: " + (payAmount-balance))
      balance=0;
    }else if(payAmount==balance){
        alert("Gracias por su compra!")
        balance=0;        
    }else{
      alert("Disculpe, no aceptamos fiado :)")
    }        
  }  
}

function validate(){
  let follow = true;
  let answer="";

  while(follow){
    answer=prompt("Desea seguir? (S/N)");
    if(answer.toLowerCase() == "n"){
      return false;
    }else if (answer.toLowerCase() == "s" ){
      return true;
    }else{
      alert("Ingrese una opción válida, S o N.")
    }
  }
}

login();

