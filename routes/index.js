var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getnovedades()

  res.render('index', {
    novedades
  });
});

router.post('/', async (req, res, next) => {

  console.log(req.body) //estoy capturando datos?

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'dairasol5@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " " + apellido + " se contacto a a traves de la web y quiere mas informacion a este correo : " + email + ". <br> Su tel es: " + telefono + "su mensaje es: " + mensaje

  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  var info = await transport.sendMail(obj);
  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});



module.exports = router;
