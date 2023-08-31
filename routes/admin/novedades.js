var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET NOVEDADES PAGINA*/
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getnovedades();
  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades
  });
});

//Para eliminar una novedad/

router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id; //2

  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
}); 



router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', { 
    layout: 'admin/layout'
  })
}); 



router.post('/agregar', async (req, res, next) => {
    try {
      if (req.body.titulo !== "" && req.body.cuerpo !== "") {  
        await novedadesModel.insertNovedad(req.body);
        res.redirect('/admin/novedades');
      } else {
        res.render('admin/agregar', {
          layout: 'admin/layout',
          error: true,
          message: 'Todos los campos son requeridos'
        });
      }
    } catch (error) {
      console.log(error);
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'No se cargó la novedad'
      });
    }
  });
  
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);

  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });

}); 


router.post('/modificar', async (req, res, next) => {
  try {

    var obj = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo
    }

   
    console.log(req.body.id); 
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {

      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  } 
}); 

module.exports = router;








