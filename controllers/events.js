const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate('user', 'name');
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoSave = await evento.save();
    res.json({
      ok: true,
      evento: eventoSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Error hable con el admin',
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    try {
      const evento = await Evento.findById(eventoId);
    } catch (error) {
      return res.status(404).json({
        ok: false,
        meesage: 'Evento no existe ',
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        meesage: 'No tiene privilegios de editar este evento',
      });
    }
    const nuevoEvento = { ...req.body, user: uid };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    return res.json({
      ok: false,
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      meesage: 'Hable con el administrador...',
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    try {
      const evento = await Evento.findById(eventoId);
    } catch (error) {
      res.status(404).json({
        ok: false,
        meesage: 'Evento no existe  por este id',
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        meesage: 'No tiene privilegios para eliminar este evento',
      });
    }

    await Evento.findByIdAndDelete(eventoId);
    res.json({
      ok: false,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      meesage: 'Hable con el administrador...',
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
