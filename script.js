// Selección de elementos del DOM
const formulario = document.getElementById('formulario-opinion');
const carouselOpiniones = document.getElementById('carousel-opiniones');

// Cargar las opiniones guardadas desde el localStorage cuando la página se carga
window.onload = function () {
    // Recuperar las opiniones del localStorage
    const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];

    // Mostrar las opiniones guardadas
    opinionesGuardadas.forEach(opinion => {
        mostrarOpinion(opinion);
    });
};

// Función para mostrar una opinión en el carrusel
function mostrarOpinion(opinion) {
    const nuevaOpinion = document.createElement('div');
    nuevaOpinion.classList.add('opinion');
    nuevaOpinion.innerHTML = `
        <p>${opinion.mensaje}</p>
        <h4>${opinion.nombre} (${opinion.email})</h4>
    `;
    carouselOpiniones.appendChild(nuevaOpinion);
}

// Escuchar el evento 'submit' del formulario
formulario.addEventListener('submit', function (event) {
    // Evitar que el formulario recargue la página
    event.preventDefault();

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar que los campos requeridos no estén vacíos
    if (nombre === '' || email === '' || mensaje === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Crear un objeto con la nueva opinión
    const nuevaOpinion = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    // Recuperar las opiniones guardadas en el localStorage
    const opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];

    // Agregar la nueva opinión al arreglo de opiniones
    opinionesGuardadas.push(nuevaOpinion);

    // Guardar las opiniones actualizadas en el localStorage
    localStorage.setItem('opiniones', JSON.stringify(opinionesGuardadas));

    // Mostrar la nueva opinión en el carrusel
    mostrarOpinion(nuevaOpinion);

    // Limpiar los campos del formulario
    formulario.reset();
});



// Galería de imágenes
let slideIndex = 0;

function cambiarImagen(n) {
    slideIndex += n;
    mostrarImagen(slideIndex);
}

function mostrarImagen(n) {
    const slides = document.querySelectorAll('.slide');
    const banner = document.querySelector('.banner'); // Sección del banner
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Desplazar las imágenes
    const offset = -slideIndex * 100; // Para mover la imagen correcta
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;

    // Cambiar el fondo del banner a la imagen activa
    const imagenFondo = slides[slideIndex].style.backgroundImage;
    banner.style.backgroundImage = imagenFondo;
}

// Cambiar imagen automáticamente cada 5 segundos
setInterval(() => {
    slideIndex++;
    mostrarImagen(slideIndex);
}, 5000); // Cambia cada 5 segundos



document.addEventListener('DOMContentLoaded', function () {
    // Botón para agregar productos al carrito
    const btnOrdenar = document.getElementById('btn-ordenar');
    btnOrdenar.addEventListener('click', function () {
        const pedido = [];

        // Definir los productos
        const hamburguesas = [
            { id: 'hamburguesa-clasica', nombre: 'Hamburguesa Clásica', precio: 350 },
            { id: 'hamburguesa-con-huevo', nombre: 'Hamburguesa con Huevo', precio: 400 },
            { id: 'hamburguesa-doble-carne', nombre: 'Hamburguesa Doble Carne', precio: 450 },
            { id: 'hamburguesa-bbq', nombre: 'Hamburguesa BBQ', precio: 470 },
            { id: 'hamburguesa-con-bacon', nombre: 'Hamburguesa con Bacon', precio: 420 },
            { id: 'hamburguesa-vegetariana', nombre: 'Hamburguesa Vegetariana', precio: 390 }
        ];

        // Recoger las cantidades y crear el pedido
        hamburguesas.forEach(item => {
            const cantidad = parseInt(document.getElementById(`cantidad-${item.id}`).value) || 0;
            if (cantidad > 0) {
                const total = cantidad * item.precio;
                pedido.push({ nombre: item.nombre, cantidad, precio: item.precio, total });
            }
        });

        // Si hay productos en el carrito, guardarlos en localStorage
        if (pedido.length > 0) {
            localStorage.setItem('pedido', JSON.stringify(pedido));
            
        } else {
            alert('Por favor, seleccione al menos una hamburguesa.');
        }
    });

    // Botón para cancelar la orden
    const btnCancelar = document.getElementById('btn-cancelar');
    btnCancelar.addEventListener('click', function () {
        // Limpiar las cantidades de los inputs
        const inputsCantidad = document.querySelectorAll('.cantidad-input');
        inputsCantidad.forEach(input => input.value = 0);
        
    });
});
