const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');

const router = Router();

// Todas las peticiones que se relizen a las rutas de este router se aplicara el validarJWT
// ya no es ncesario definirlo así  router.get('/', validarJWT, getEventos);  para cada evento
router.use(validarJWT);

router.get('/', getEventos);

router.post(
  '/',
  [
    check('title', 'El titulo es oblogatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es oblogatorio').custom(isDate),
    check('end', 'Fecha fin es oblogatorio').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put(
  '/:id',
  [
    check('title', 'El titulo es oblogatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es oblogatorio').custom(isDate),
    check('end', 'Fecha fin es oblogatorio').custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

router.delete('/:id', eliminarEvento);

module.exports = router;
