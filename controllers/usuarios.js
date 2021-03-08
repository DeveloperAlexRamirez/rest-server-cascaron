const { request, response } = require('express');

const Usuario = require('../models/usuario');

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
  const body = req.body;

  const usuario = new Usuario(body);

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
