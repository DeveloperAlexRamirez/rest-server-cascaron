const { request, response } = require('express');
const Usuario = require('../models/usuario');

// For password validation
const bcryptjs = require('bcryptjs');
// For email validation and not to be duplicated
const { validationResult } = require('express-validator');

const usuariosGet = (req = request, res = response) => {
  const { nombre = 'No name', apikey, page = 1, limit = 10 } = req.query;

  res.json({
    msg: 'usuariosGet - Controlador',
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { nombre, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, email, password, rol });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: 'El correo ya está registrado,',
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'usuariosPut - Controlador',
    id,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'usuariosDelete - Controlador',
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'usuariosPatch - Controlador',
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
  usuariosPatch,
};
