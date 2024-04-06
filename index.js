const express = require('express');
const app = express();

// Datos de ejemplo para la lista de productos
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Middleware para analizar el cuerpo de las peticiones JSON
app.use(express.json());

// GET: Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// POST: Agregar un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1; // Asignar un nuevo ID
    productos.push(nuevoProducto);
    res.status(201).send(nuevoProducto);
});

// PUT: Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos[indice] = {...productos[indice], ...req.body};
        res.send(productos[indice]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// DELETE: Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos.splice(indice, 1);
        res.status(200).send(`Producto con id ${id} eliminado`);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Definir el puerto y poner en marcha el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
