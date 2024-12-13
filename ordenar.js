document.addEventListener('DOMContentLoaded', function () {
    // Recuperar el pedido desde el localStorage
    let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

    // Verificar si hay productos en el carrito
    if (pedido.length === 0) {
        alert('No has seleccionado ningún producto. Por favor, agrega productos al carrito antes de proceder.');
        window.location.href = 'index.html';
        return; 
    }

    // Llenar la vista con los productos
    const contenedor = document.getElementById('contenedor-hamburguesas');
    if (!contenedor) {
        console.error("El contenedor 'contenedor-hamburguesas' no se encuentra en el DOM.");
        return;
    }

    pedido.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('pedido-item');
        div.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio por unidad: $${item.precio}</p>
            <p>Total: $${item.total}</p>
        `;
        contenedor.appendChild(div);
    });

    // **Cálculo del subtotal, descuento y total con descuento**
    const subTotal = pedido.reduce((acc, item) => acc + item.total, 0); // Suma de los totales
    const descuento = subTotal * 0.10; // 10% de descuento
    const totalConDescuento = subTotal - descuento; // Precio final con descuento

    // **Actualizar la vista de precios en la sección de confirmación**
    const subTotalElement = document.getElementById('subTotal-pagar');
    const descuentoElement = document.getElementById('descuento');
    const totalFinalElement = document.getElementById('total-final');

    if (subTotalElement && descuentoElement && totalFinalElement) {
        subTotalElement.innerHTML = `Sub total a pagar: $${subTotal.toFixed(2)}`;
        descuentoElement.innerHTML = `Descuento (10%): $${descuento.toFixed(2)}`;
        totalFinalElement.innerHTML = `Total con descuento: $${totalConDescuento.toFixed(2)}`;
    }

    // **Formulario de confirmación de la orden**
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();  

        const nombre = document.getElementById('nombre').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        // **Validaciones de los campos**
        if (!validarNombre(nombre)) {
            alert('El nombre debe tener al menos 2 caracteres y solo puede contener letras y espacios.');
            return;
        }

        if (!validarCelular(celular)) {
            alert('El número de celular debe contener entre 8 y 15 dígitos numéricos.');
            return;
        }

        if (!validarDireccion(direccion)) {
            alert('La dirección debe tener al menos 5 caracteres.');
            return;
        }

        // **Detalles de la orden**
        const detallesOrden = {
            nombre: nombre,
            celular: celular,
            direccion: direccion,
            pedido: pedido,
            subTotal: subTotal.toFixed(2),
            descuento: descuento.toFixed(2),
            totalConDescuento: totalConDescuento.toFixed(2)
        };

        console.log('Detalles de la orden:', detallesOrden);

        // Limpiar el localStorage después de la compra
        localStorage.removeItem('pedido');
        alert(`¡Gracias por tu compra, ${nombre}! La orden ha sido recibida y en media hora estará lista.`);

        // Redirigir a la página principal
        window.location.href = 'index.html';
    });

    // **Botón cancelar orden**
    const btnCancelarOrden = document.getElementById('btn-cancelar-orden');
    btnCancelarOrden.addEventListener('click', function () {
        // Limpiar el localStorage al cancelar la orden
        localStorage.removeItem('pedido');
        window.location.href = 'index.html';
    });

    // **Funciones de validación**
    function validarNombre(nombre) {
        const regex = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // Solo letras (mayúsculas, minúsculas y con acentos) y espacios, mínimo 2 caracteres
        return regex.test(nombre);
    }

    function validarCelular(celular) {
        const regex = /^[0-9]{8,15}$/; // Solo números de 8 a 15 dígitos
        return regex.test(celular);
    }

    function validarDireccion(direccion) {
        return direccion.length >= 5; // La dirección debe tener al menos 5 caracteres
    }
});
