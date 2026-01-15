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

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dateBox = document.getElementById("date-box");
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You need to add something");
        return;
    }

    let li = document.createElement("li");
    let dateText = "";
    if (dateBox.value) {
        const selectedDate = new Date(dateBox.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diffTime = selectedDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            dateText = " (today)";
        } else if (diffDays === 1) {
            dateText = " (tomorrow)";
        } else if (diffDays > 1) {
            dateText = ` (in ${diffDays} days)`;
        } else {
            dateText = " (expired)";
        }
    }

    // Insertar contenido: Texto + Fecha en pequeño
    li.innerHTML = `${inputBox.value} <small class="date-label">${dateText}</small>`;
    
    // Crear botón de eliminar
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);

    // Limpiar campos y devolver el foco al input
    inputBox.value = "";
    dateBox.value = "";
    saveData();
    inputBox.focus(); 
}

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        addTask();
        saveData();
    }
});




listContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }

}, false);

function clearTasks() {
    if (confirm("¿Estás seguro de que quieres borrar todas las notas?")) {
        // 1. Limpia el contenedor visualmente
        listContainer.innerHTML = "";
        
        // 2. Borra los datos del almacenamiento local
        localStorage.removeItem('data'); 
        
        // Opcional: devolver el foco al input
        inputBox.focus();
    }
}

const saveData = () => {
    localStorage.setItem('data', listContainer.innerHTML);
}

const showTask = () => {
    listContainer.innerHTML = localStorage.getItem('data');
}
showTask();