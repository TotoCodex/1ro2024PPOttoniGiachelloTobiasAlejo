class Persona
{
    #id;
    #nombre;
    #apellido;
    #fechaNacimiento;

   constructor(id,nombre,apellido,fechaNacimiento){
    this.#id=id;
    this.#nombre=nombre;
    this.#apellido=apellido;
    this.#fechaNacimiento=fechaNacimiento;



}


}
class Ciudadano extends Persona
{
    #dni;
    
    
constructor(dni,id,nombre,apellido,fechaNacimiento)
{
    this.#dni=dni;
    super(id,nombre,apellido,fechaNacimiento)//super se usa para llamar al constructor de la clase padre dentro de una subclase para inicializar las propiedades
}


}
class Extranjero extends Persona{

    #paisOrigen;

    constructor(paisOrigen,id,nombre,apellido,edad){
        this.#paisOrigen=paisOrigen;
    
        super(id,nombre,apellido,edad);
    }

}


 // revisar porque habia timing issue que el script se cargaba antes de que el DOM estuviera loaded
 function MostrarTabla(lista) {

    lista.forEach(personas=>{// empiezo por la primera persona, crea tr en el html, hace td por id luego por nombre de izquierda a derecha hasta que termina el loop y empieza denuevo, luego crea otro row abajo y continua asi.
                
        const tabla=document.getElementById("data-output");
        
        
        const fila=document.createElement("tr");
        fila.id="fila-read";
        
        const tdID=document.createElement("td");
        tdID.id="columna-id";
        tdID.style.display="block";
        tdID.textContent=personas.id;
        fila.appendChild(tdID);

        const tdNombre=document.createElement("td");
        tdNombre.id="columna-nombre";
        tdNombre.textContent=personas.nombre;
        fila.appendChild(tdNombre);
        
        const tdApellido=document.createElement("td");
        tdApellido.id="columna-apellido";
        tdApellido.textContent=personas.apellido;
        fila.appendChild(tdApellido);
        
        const tdFechadeNacimiento=document.createElement("td");
        tdFechadeNacimiento.id="columna-edad";
        tdFechadeNacimiento.textContent=formatFechaNacimiento((personas.fechaNacimiento).toString());
        fila.appendChild(tdFechadeNacimiento);
        
        const tdDNI=document.createElement("td");
        tdDNI.id="columna-sueldo";
        tdDNI.textContent=personas.dni || "" ;
        fila.appendChild(tdDNI);
        
        const tdPaisdeOrigen=document.createElement("td");
        tdPaisdeOrigen.id="columna-ventas";
        tdPaisdeOrigen.textContent=personas.paisOrigen || "";
        fila.appendChild(tdPaisdeOrigen);

    



        tabla.appendChild(fila);//cuanto termina de agregar los td en la misma tr(row) carga toooda la fila para asi ir abajo por la segunda fila
        fila.addEventListener("dblclick",function(){
            
            
            document.getElementById("ABMID").value=tdID.textContent;
            document.getElementById("ABMNombre").value=tdNombre.textContent;
            document.getElementById("ABMApellido").value=tdApellido.textContent;
            document.getElementById("ABMFechadeNacimiento").value=tdFechadeNacimiento.textContent;
            document.getElementById("ABMDNI").value=tdDNI.textContent;
            document.getElementById("ABMPaisdeOrigen").value=tdPaisdeOrigen.textContent;
     
            
            
            valorFiltro.disabled = true;

           
            if(tdDNI.textContent>0){
                
                valorFiltro.value='Ciudadano';
                AtributosCiudadanos.style.display='block';
                AtributosExtranjeros.style.display='none';
            }
            else{
                valorFiltro.value='Extranjero';
                AtributosExtranjeros.style.display='block';
                AtributosCiudadanos.style.display='none';  
            }
        
            irFormABM();
            
          
            
            
          
            
        })
})

}
function formatFechaNacimiento(fechaNacimiento) {
    
    const año = fechaNacimiento.substring(0, 4);
    const mes = fechaNacimiento.substring(4, 6);
    const dia = fechaNacimiento.substring(6, 8);

    
    const formattedDate = `${dia}/${mes}/${año}`;

    return formattedDate;
}
function irFormABM(){
    form1.style.display='none';
    form2.style.display='block';

}

function EsconderInputEC(){
    
    AtributosCiudadanos.style.display='none';
    AtributosExtranjeros.style.display='none';


}
function VaciarTabla(){

    let ta;
    ta=document.getElementById("data-output");
    ta.innerHTML='';

}
function VaciarCalcularEdad(){

    let ta;
    ta=document.getElementById('Calcular');
    ta.value='';

}
function CalcularEdad(lista){
    const boton=document.getElementById('botonCalcular');

    boton.addEventListener('click',function(){  
    const texto=document.getElementById('Calcular');
        
        let acumulador=0;
        let contador=0;
        lista.forEach(persona=>{
            const añoNacimiento = parseInt(persona.fechaNacimiento.toString().slice(0, 4));
            
            const edad = new Date().getFullYear() - añoNacimiento;
            acumulador+=edad;
            
            contador++;
        });
        let promedio=acumulador/contador;
        texto.value=promedio;
    });
}

function FiltradoFormDatos(){
    const menuSeleccionado = document.querySelector('select'); 
    menuSeleccionado.addEventListener('change',function(){
        
       
        const http = new XMLHttpRequest();
        const url = 'http://127.0.0.1:5500/PARCIAL/parcial1.html';
        http.onreadystatechange = function(){
            if(http.readyState == 4) {
                if (http.status == 200){
                    
                    if(menuSeleccionado.value === 'Todos'){
                        VaciarTabla();
                        VaciarCalcularEdad();
                        MostrarTabla(personasArray); 
                        CalcularEdad(personasArray); 
                    }
                    if(menuSeleccionado.value === 'Ciudadanos'){
                        VaciarTabla();
                        VaciarCalcularEdad();
                        
                        MostrarTabla(listadeCiudadano); 
                        CalcularEdad(listadeCiudadano);
                    }
                    if(menuSeleccionado.value === 'Extranjeros'){
                        VaciarTabla();
                        VaciarCalcularEdad();
                        
                        MostrarTabla(listadeExtranjero);
                        CalcularEdad(listadeExtranjero);
                    
                    }
                    
                    console.log("Perfecto");
                }
                if (http.status == 404){
        
                    console.log("File not found");
        
                }
            }
            };
        
            http.open('get',url,true);
            http.send();
});


}

function botonAgregar(){
   
    const Agregar = document.getElementById("Agregar");
    Agregar.addEventListener("click",function(){
        
        valorFiltro.disabled = false;
        valorFiltro.value='-';
        
       irFormABM();
       
    });


}
function modificarUsuario(abmID){
        if(/\d/.test(document.getElementById("ABMNombre").value) || /\d/.test(document.getElementById("ABMApellido").value)|| /\d/.test(document.getElementById("ABMPaisdeOrigen").value)){
            alert("Uno o mas campos poseen numeros, por favor rellene el campo nuevamente");
            return;
        }
        else{
            alert("Desea modificar atributos de la persona?");
            const personIndex = personasArray.findIndex(person => person.id === abmID);
            if (personIndex !== -1) {
                personasArray[personIndex].nombre = document.getElementById("ABMNombre").value;
                personasArray[personIndex].apellido = document.getElementById("ABMApellido").value;
                personasArray[personIndex].fechaNacimiento = document.getElementById("ABMFechadeNacimiento").value;
                personasArray[personIndex].dni =parseInt(document.getElementById("ABMDNI").value);
                personasArray[personIndex].paisOrigen = document.getElementById("ABMPaisdeOrigen").value;
            }
        }

}

function irFormDatos(){

    form2.style.display='none';
    form1.style.display='block';
}

function vaciarInputsAgregar(){
    document.getElementById("ABMID").value='';
    document.getElementById("ABMNombre").value='';
    document.getElementById("ABMApellido").value='';
    document.getElementById("ABMFechadeNacimiento").value='';
    document.getElementById("ABMPaisdeOrigen").value='';
    document.getElementById("ABMDNI").value='';
    document.getElementById("filter-select").value='-';
   
   
}
function crearUsuarioNuevo(){

    ABMID=validarIdUnico();
            
    let ABMNombre=document.getElementById("ABMNombre").value;
    let ABMApellido=document.getElementById("ABMApellido").value;
    let ABMFechadeNacimiento=document.getElementById("ABMFechadeNacimiento").value;
    let ABMDNI=parseInt(document.getElementById("ABMDNI").value);
    let ABMPaisdeOrigen=document.getElementById("ABMPaisdeOrigen").value; 


    if(valorFiltro.value=='Ciudadano'){
        let personaNueva = {"id":ABMID,"apellido":ABMApellido,"nombre": ABMNombre,"fechaNacimiento":ABMFechadeNacimiento,"dni":ABMDNI,"paisOrigen":ABMPaisdeOrigen};
        personasArray.push(personaNueva);
        listadeCiudadano.push(personaNueva);
    }
    if(valorFiltro.value=='Extranjero'){
        let personaNueva = {"id":ABMID,"apellido":ABMApellido,"nombre": ABMNombre,"fechaNacimiento":ABMFechadeNacimiento,"dni":ABMDNI,"paisOrigen":ABMPaisdeOrigen};
        personasArray.push(personaNueva);
        listadeExtranjero.push(personaNueva);
    } 
}

function botonCancelar(){

const btnCancelar= document.getElementById('Cancelar');

btnCancelar.addEventListener("click",function(){

    
    form2.style.display='none';
    form1.style.display='block';

vaciarInputsAgregar();    
EsconderInputEC();




})



}
function botonAceptar(){
    const Aceptar = document.getElementById("Aceptar");
    const valorFiltro = document.getElementById("filter-select1");
    

    Aceptar.addEventListener("click",function(){
        if (valorFiltro.value=='-'){
            alert("Ingrese TIPO valido");
            return;
        }
        let ABMID=parseInt(document.getElementById("ABMID").value);
        if(!isNaN(ABMID)){// Chequea si el ID es distinto a nulo, OSEA QUE SI EXISTE, Modifique atributos de persona
            modificarUsuario(ABMID);
            irFormDatos();
            VaciarTabla();
            MostrarTabla(personasArray);
            vaciarInputsAgregar();
            EsconderInputEC();
        }
        
        else{
            
            crearUsuarioNuevo();
            irFormDatos();
            VaciarTabla();
            MostrarTabla(personasArray);
            vaciarInputsAgregar();
            EsconderInputEC();
        }
    });
}
    
function validarIdUnico() {
    let listadeIDS = personasArray.map(persona => ({id: persona.id}));
    let nRandom=getNumeroRandom();
    let numeroId=0;
    listadeIDS.forEach(ID=>{
            
        if((ID.id)!=nRandom){
            numeroId=nRandom;
        }

    });
    return numeroId;
    
    


}
function getNumeroRandom() {
    return Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
}


function selectTipo(){
    const filter = document.getElementById("filter-select1");
    
    filter.addEventListener('change',function(){
    
        if (filter.value=='Ciudadano'){
        
        AtributosCiudadanos.style.display='block';
        AtributosExtranjeros.style.display='none';
        }
        if (filter.value=="Extranjero"){
            AtributosExtranjeros.style.display='block';
            AtributosCiudadanos.style.display='none';  
        }
    

    });

}

function Eliminar(){

const btnEliminar=document.getElementById('Eliminar');
btnEliminar.addEventListener("click",function(){
    let ABMID=document.getElementById('ABMID').value;
    personasArray= personasArray.filter(persona=>persona.id != ABMID);
    listadeExtranjero = personasArray.filter(persona=>(persona.dni == null));
    listadeCiudadano = personasArray.filter(persona =>(persona.paisOrigen == null));
    form1.style.display="block";
    form2.style.display="none";

    VaciarTabla();
    MostrarTabla(personasArray);
    vaciarInputsAgregar();
    EsconderInputEC();
})
}
let jsonString = '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]';


let personasArray = JSON.parse(jsonString);


let listadeExtranjero = personasArray.filter(persona=>(persona.dni == null));
let listadeCiudadano = personasArray.filter(persona =>(persona.paisOrigen == null));

let listadePersonas = personasArray.map(persona => ({id: persona.id, nombre: persona.nombre, apellido: persona.apellido, fechaNacimiento: persona.fechaNacimiento}));
let ABMID=document.getElementById("ABMID").value;
let ABMNombre=document.getElementById("ABMNombre").value;
let ABMApellido=document.getElementById("ABMApellido").value;
let ABMFechadeNacimiento=document.getElementById("ABMFechadeNacimiento").value;
let ABMDNI=parseInt(document.getElementById("ABMID").value);
let ABMPaisdeOrigen=document.getElementById("ABMPaisdeOrigen").value; 


const valorFiltro=document.getElementById('filter-select1');
const form1= document.getElementById('Formulario');
const form2=document.getElementById('Formulario2');

form1.style.display='block';

const AtributosCiudadanos = document.getElementById("AtributosCiudadanos");
const AtributosExtranjeros = document.getElementById("AtributosExtranjeros");

selectTipo();
MostrarTabla(personasArray); 
CalcularEdad(personasArray);
FiltradoFormDatos();

botonAgregar(); 
botonAceptar();
botonCancelar();
Eliminar();
validarIdUnico();




    
    

