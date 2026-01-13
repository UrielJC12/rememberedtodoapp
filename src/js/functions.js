//---aside
const menuButtons = document.querySelectorAll(".menu"); 
const aside = document.querySelector(".aside"); 


menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        aside.classList.toggle('toggle');
        
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        
        aside.classList.remove('toggle');
        
    }
});

const themeButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement; // Selecciona la etiqueta <html>

// 1. CARGA INICIAL
// Revisamos si hay tema guardado y lo aplicamos al atributo data-theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

// 2. LÓGICA DEL CLIC
themeButton.addEventListener('click', () => {
    // Obtenemos el valor actual del atributo (puede ser 'dark', 'light' o null)
    const currentTheme = htmlElement.getAttribute('data-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let newTheme;

    // Lógica para decidir el siguiente tema
    if (currentTheme === 'dark') {
        // Si estaba forzado en oscuro -> cambiamos a claro
        newTheme = 'light';
    } else if (currentTheme === 'light') {
        // Si estaba forzado en claro -> cambiamos a oscuro
        newTheme = 'dark';
    } else {
        // Si es null (Modo Automático), invertimos la preferencia del sistema
        newTheme = systemPrefersDark ? 'light' : 'dark';
    }

    // APLICAMOS EL CAMBIO
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});


//notebook funtionality

const inutBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if (inutBox.value === ''){
        alert("You need to add something");

    } 
    else {
        let li = document.createElement("li");
        li.innerHTML = inutBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inutBox.value = ""
    saveData();
}

listContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }

}, false);

const saveData = () => {
    localStorage.setItem('data', listContainer.innerHTML);
}

const showTask = () => {
    listContainer.innerHTML = localStorage.getItem('data');
}
showTask();