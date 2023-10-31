const express = require('express');
const router = express.Router();
const controller = require('../controllers/members');

/* GET users listing. */
router.post('/', controller.create);

router.get('/', controller.list); //separamos el controlador del enrutador para que cada cosa haga sólo lo que debe y nada más

router.get('/:id',controller.index); // los dos puntos indican que es una variable, el orden de los controladores afectan la ejecución

router.put('/:id', controller.replace);

router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);



//router.('/:id', controller.);

module.exports = router;
