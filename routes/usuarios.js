const { Router } = require('express');
const { check } = require('express-validator');

// Middleware
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

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
  [check('nombre', 'El nombre es obligatorio').not().isEmpty()],
  [check('email', 'El email no es válido').isEmail()],
  [
    check(
      'password',
      'La contraseña debe de ser mayor a 6 caracteres'
    ).isLength({ min: 6 }),
  ],
  // [check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE'])],
  check('rol').custom(async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
  }),
  validarCampos,
  usuariosPost
);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;
