const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const NotaPendiente = require('../models/nota_pendiente');

// Obtener clientes y sus notas pendientes por ID de empresa
router.get('/empresa/:empresaId/clientes', async (req, res) => {
  const { empresaId } = req.params;
  try {
    const clientes = await Cliente.findAll({
      where: { empresa_id: empresaId },
      include: [{
        model: NotaPendiente,
        as: 'NotasPendientes',
        where: {
          empresa_id: empresaId
        },
        required: false
      }]
    });
    const clientesMap = clientes.map(cliente => ({
      empresa_id: cliente.empresa_id,
      sucursal_id: cliente.sucursal_id,
      cliente_id: cliente.cliente_id,
      Cuenta: cliente.Cuenta,
      Nombre: cliente.Nombre,
      Direccion: cliente.Direccion,
      Telefono: cliente.Telefono,
      cobrador_id: cliente.cobrador_id,
      NotasPendientes: cliente.NotasPendientes.map(nota => ({
        empresa_id: nota.empresa_id,
        sucursal_id: nota.sucursal_id,
        Cuenta: nota.Cuenta,
        Fecha: nota.Fecha,
        nro_nota: nota.nro_nota,
        Importe_nota: nota.Importe_nota,
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
