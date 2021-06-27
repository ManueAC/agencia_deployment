// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from "dotenv";
dotenv.config({ path: "./variables.env" });

const app = express();

//Conectar la base de datos

db.authenticate()
    .then( () => { console.log('BD Conectada') } )
    .catch( error => console.log(error))

//Definir puerto
// const port = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habiltar PUG
app.set( 'view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next) => {
    
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
} );

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded( {extended: true} ));

//Agregar router
app.use( '/', router );

//Definir la carpeta pública
app.use( express.static('public') );

//pUERTO Y HOST PARA APP
// const port = process.env.HOST || '0.0.0.0';
const host = process.env.HOST || '0.0.0.0';

app.listen( port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
} )


//app.get('/', (req,res) => { // req. lo que enviamos : res - lo que express nos responde
//     res.send('Hola mundo');
// });
// app.get('/nosotros', (req,res) => {
//     res.send('Nosotros');
// });
// app.get('/contaco', (req,res) => {
//     res.send('Contacto');
// });
