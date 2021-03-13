const { Router } = require('express');
const { check } = require('express-validator');

const {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
  usuariosPatch,
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post(
  '/',
  [check('email', 'El email no es válido').isEmail()],
  usuariosPost
);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;
