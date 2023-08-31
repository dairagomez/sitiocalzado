var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

// Ruta para cargar el formulario de inicio de sesión
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

// Ruta para manejar el inicio de sesión (POST)
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserAndPassword(usuario, password);
        console.log(data, "post getuserrandpass")
        if (data != undefined) {
            console.log(data, "data dentro del if")
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            res.redirect('/admin/novedades');
        } else {
            console.log(data, "data dentro del else")
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
});



//ruta para destruir variables de session/
router.get('/logout', function (req, res, next) {
    req.session.destroy(); // destruir
    res.render('admin/login', {
    layout:'admin/layout'
    });
    });

module.exports = router;