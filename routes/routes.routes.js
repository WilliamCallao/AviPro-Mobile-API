const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const NotaPendiente = require('../models/nota_pendiente');

// Obtener clientes y sus notas pendientes por ID de empresa
router.get('/empresa/:empresaId/clientes', async (req, res) => {
  const { empresaId } = req.params;
  try {
    const clientes = await Cliente.findAll({
      where: { Empresa_ID: empresaId },
      include: [{
        model: NotaPendiente,
        as: 'NotasPendientes',
        where: {
          Empresa_ID: empresaId
        },
        required: false
      }]
    });
    const clientesMap = clientes.map(cliente => ({
      Empresa_ID: cliente.Empresa_ID,
      sucursal_ID: cliente.sucursal_ID,
      cliente_ID: cliente.cliente_ID,
      Cuenta: cliente.Cuenta,
      Nombre: cliente.Nombre,
      Direccion: cliente.Direccion,
      Telefono: cliente.Telefono,
      cobrador_ID: cliente.cobrador_ID,
      NotasPendientes: cliente.NotasPendientes.map(nota => ({
        Empresa_ID: nota.Empresa_ID,
        sucursal_ID: nota.sucursal_ID,
        Cuenta: nota.Cuenta,
        Fecha: nota.Fecha,
        nro_nota: nota.nro_nota,
        importe_nota: nota.importe_nota,
        Monto_pagado: nota.Monto_pagado,
        Saldo_pendiente: nota.Saldo_pendiente,
        Fecha_venta: nota.Fecha_venta,
        Fecha_vence: nota.Fecha_vence
      }))
    }));
    res.json(clientesMap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los clientes y sus notas pendientes' });
  }
});

module.exports = router;
