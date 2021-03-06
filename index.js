const Contenedor = require('./App.js');
const express = require('express');

const PORT = 8080
const app = express();
const server = app.listen(PORT,()=> {
    console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`)
})

const productos = new Contenedor('products.txt');

app.get('/', (req, res)=>{
    res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>');
});

app.get('/products', async (req, res) =>{

    const showProducts = await productos.getAll();
    res.send(showProducts);

});


app.get('/randomproducts', async (req, res) =>{
    const r = await productos.getAll();
    const randomNumber = Math.floor(Math.random() * r.length);
    res.send(r[randomNumber]);

});

