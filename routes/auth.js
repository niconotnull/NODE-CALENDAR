/*
    Rutas de usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require('../controllers/auth');

router.post(
  '/new',
  [
    check('name', 'El nombre el obligatorio').not().isEmpty(),
    check('email', 'El email el obligatorio').isEmail(),
    check('password', 'El password debera de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ] /* Midelwers */,
  crearUsuario
);

router.post(
  '/',
  [
    check('email', 'El email el obligatorio').isEmail(),
    check('password', 'El password debera de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
