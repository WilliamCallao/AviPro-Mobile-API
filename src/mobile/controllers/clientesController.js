// controllers/clientesMobileController.js

const ClienteMobile = require('../models/clientesMobile');
const sequelize = require('../../configs/database');

// Obtener todos los clientes de móvil
const getClientesMobile = async (req, res) => {
  try {
    const clientes = await ClienteMobile.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Error fetching mobile clients');
  }
};

// Obtener clientes por empresa_id
const getClientesByEmpresa = async (req, res) => {
  try {
    const { empresa_id } = req.params;
    const clientes = await ClienteMobile.findAll({
      where: { empresa_id }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Error fetching clients for the specified company');
  }
};

// Obtener clientes con notas pendientes por empresa_id
const getClientesConNotasPendientes = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    // Consulta SQL para obtener clientes, notas pendientes y notas cobradas
    const query = `
      SELECT
        c.empresa_id,
        c.sucursal_id,
        c.cliente_id,
        c.cuenta,
        c.nombre,
        c.direccion,
        c.telefono,
        c.cobrador_id,
        np.empresa_id AS nota_empresa_id,
        np.sucursal_id AS nota_sucursal_id,
        np.cuenta AS nota_cuenta,
        np.fecha AS nota_fecha,
        np.nro_nota AS nota_nro_nota,
        np.importe_nota AS nota_importe_nota,
        np.monto_pagado AS nota_monto_pagado,
        np.saldo_pendiente AS nota_saldo_pendiente,
        np.fecha_venta AS nota_fecha_venta,
        np.fecha_vence AS nota_fecha_vence,
        np.nro_factura AS nota_nro_factura,
        nc.empresa_id AS cobrada_empresa_id,
        nc.sucursal_id AS cobrada_sucursal_id,
        nc.cuenta AS cobrada_cuenta,
        nc.fecha AS cobrada_fecha,
        nc.referencia AS cobrada_referencia,
        nc.pago_a_nota AS cobrada_pago_a_nota,
        nc.monto AS cobrada_monto,
        nc.moneda AS cobrada_moneda,
        nc.modo_pago AS cobrada_modo_pago,
        nc.cta_deposito AS cobrada_cta_deposito,
        nc.observaciones AS cobrada_observaciones,
        nc.nro_factura AS cobrada_nro_factura,
        nc.fecha_registro AS cobrada_fecha_registro
      FROM
        mobile_clientes c
      LEFT JOIN
        mobile_notas_pendientes np ON c.cuenta = np.cuenta
      LEFT JOIN
        mobile_notas_cobradas nc ON c.cuenta = nc.cuenta
      WHERE
        c.empresa_id = ?
    `;

    const results = await sequelize.query(query, {
      replacements: [empresa_id],
      type: sequelize.QueryTypes.SELECT
    });

    // Verificar si results es un array
    const clientesArray = Array.isArray(results) ? results : [results];

    // Transformar resultados en el formato requerido
    const clientesMap = {};
    clientesArray.forEach(row => {
      if (!clientesMap[row.cliente_id]) {
        clientesMap[row.cliente_id] = {
          empresa_id: row.empresa_id,
          sucursal_id: row.sucursal_id,
          cliente_id: row.cliente_id,
          cuenta: row.cuenta,
          nombre: row.nombre,
          direccion: row.direccion,
          telefono: row.telefono,
          cobrador_id: row.cobrador_id,
          notas_pendientes: new Set(),
          notas_cobradas: new Set()
        };
      }
      if (row.nota_nro_nota && parseFloat(row.nota_saldo_pendiente) > 0) {
        clientesMap[row.cliente_id].notas_pendientes.add(JSON.stringify({
          empresa_id: row.nota_empresa_id,
          sucursal_id: row.nota_sucursal_id,
          cuenta: row.nota_cuenta,
          fecha: row.nota_fecha,
          nro_nota: row.nota_nro_nota,
          importe_nota: row.nota_importe_nota,
          monto_pagado: row.nota_monto_pagado,
          saldo_pendiente: row.nota_saldo_pendiente,
          fecha_venta: row.nota_fecha_venta,
          fecha_vence: row.nota_fecha_vence,
          nro_factura: row.nota_nro_factura
        }));
      }
      if (row.cobrada_fecha) {
        clientesMap[row.cliente_id].notas_cobradas.add(JSON.stringify({
          empresa_id: row.cobrada_empresa_id,
          sucursal_id: row.cobrada_sucursal_id,
          cuenta: row.cobrada_cuenta,
          fecha: row.cobrada_fecha,
          referencia: row.cobrada_referencia,
          pago_a_nota: row.cobrada_pago_a_nota,
          monto: row.cobrada_monto,
          moneda: row.cobrada_moneda,
          modo_pago: row.cobrada_modo_pago,
          cta_deposito: row.cta_deposito,
          observaciones: row.cobrada_observaciones,
          nro_factura: row.cobrada_nro_factura,
          fecha_registro: row.cobrada_fecha_registro
        }));
      }
    });

    // Convertir Sets a arrays y parsear JSON strings de vuelta a objetos
    const clientesList = Object.values(clientesMap).map(cliente => ({
      ...cliente,
      notas_pendientes: Array.from(cliente.notas_pendientes).map(nota => JSON.parse(nota)),
      notas_cobradas: Array.from(cliente.notas_cobradas).map(nota => JSON.parse(nota))
    }));

    res.json(clientesList);
  } catch (error) {
    console.error('Error fetching clients with pending and paid notes', error);
    res.status(500).send('Error fetching clients with pending and paid notes');
  }
};

// Obtener cliente por cuenta con sus notas pendientes y cobradas
const getClienteByCuenta = async (req, res) => {
  const { cuenta } = req.params;

  try {
    // Consulta SQL para obtener un cliente, sus notas pendientes y cobradas por cuenta
    const query = `
      SELECT
        c.empresa_id,
        c.sucursal_id,
        c.cliente_id,
        c.cuenta,
        c.nombre,
        c.direccion,
        c.telefono,
        c.cobrador_id,
        np.empresa_id AS nota_empresa_id,
        np.sucursal_id AS nota_sucursal_id,
        np.cuenta AS nota_cuenta,
        np.fecha AS nota_fecha,
        np.nro_nota AS nota_nro_nota,
        np.importe_nota AS nota_importe_nota,
        np.monto_pagado AS nota_monto_pagado,
        np.saldo_pendiente AS nota_saldo_pendiente,
        np.fecha_venta AS nota_fecha_venta,
        np.fecha_vence AS nota_fecha_vence,
        np.nro_factura AS nota_nro_factura,
        nc.empresa_id AS cobrada_empresa_id,
        nc.sucursal_id AS cobrada_sucursal_id,
        nc.cuenta AS cobrada_cuenta,
        nc.fecha AS cobrada_fecha,
        nc.referencia AS cobrada_referencia,
        nc.pago_a_nota AS cobrada_pago_a_nota,
        nc.monto AS cobrada_monto,
        nc.moneda AS cobrada_moneda,
        nc.modo_pago AS cobrada_modo_pago,
        nc.cta_deposito AS cobrada_cta_deposito,
        nc.observaciones AS cobrada_observaciones,
        nc.nro_factura AS cobrada_nro_factura,
        nc.fecha_registro AS cobrada_fecha_registro,
        nc.cobrador_id AS cobrada_cobrador_id
      FROM
        mobile_clientes c
      LEFT JOIN
        mobile_notas_pendientes np ON c.cuenta = np.cuenta
      LEFT JOIN
        mobile_notas_cobradas nc ON c.cuenta = nc.cuenta
      WHERE
        c.cuenta = ?
    `;

    const results = await sequelize.query(query, {
      replacements: [cuenta],
      type: sequelize.QueryTypes.SELECT
    });

    // Verificar si results es un array
    const clientesArray = Array.isArray(results) ? results : [results];

    // Transformar resultados en el formato requerido
    const clientesMap = {};
    clientesArray.forEach(row => {
      if (!clientesMap[row.cliente_id]) {
        clientesMap[row.cliente_id] = {
          empresa_id: row.empresa_id,
          sucursal_id: row.sucursal_id,
          cliente_id: row.cliente_id,
          cuenta: row.cuenta,
          nombre: row.nombre,
          direccion: row.direccion,
          telefono: row.telefono,
          cobrador_id: row.cobrador_id,
          notas_pendientes: new Set(),
          notas_cobradas: new Set()
        };
      }
      if (row.nota_nro_nota && parseFloat(row.nota_saldo_pendiente) > 0) {
      // if (row.nota_nro_nota) {
        clientesMap[row.cliente_id].notas_pendientes.add(JSON.stringify({
          empresa_id: row.nota_empresa_id,
          sucursal_id: row.nota_sucursal_id,
          cuenta: row.nota_cuenta,
          fecha: row.nota_fecha,
          nro_nota: row.nota_nro_nota,
          importe_nota: row.nota_importe_nota,
          monto_pagado: row.nota_monto_pagado,
          saldo_pendiente: row.nota_saldo_pendiente,
          fecha_venta: row.nota_fecha_venta,
          fecha_vence: row.nota_fecha_vence,
          nro_factura: row.nota_nro_factura
        }));
      }
      if (row.cobrada_fecha) {
        clientesMap[row.cliente_id].notas_cobradas.add(JSON.stringify({
          empresa_id: row.cobrada_empresa_id,
          sucursal_id: row.cobrada_sucursal_id,
          cuenta: row.cobrada_cuenta,
          fecha: row.cobrada_fecha,
          referencia: row.cobrada_referencia,
          pago_a_nota: row.cobrada_pago_a_nota,
          monto: row.cobrada_monto,
          moneda: row.cobrada_moneda,
          modo_pago: row.cobrada_modo_pago,
          cta_deposito: row.cobrada_cta_deposito,
          observaciones: row.cobrada_observaciones,
          nro_factura: row.cobrada_nro_factura,
          fecha_registro: row.cobrada_fecha_registro,
          cobrador_id: row.cobrada_cobrador_id
        }));
      }
    });

    // Convertir Sets a arrays y parsear JSON strings de vuelta a objetos
    const cliente = Object.values(clientesMap).map(cliente => ({
      ...cliente,
      notas_pendientes: Array.from(cliente.notas_pendientes).map(nota => JSON.parse(nota)),
      notas_cobradas: Array.from(cliente.notas_cobradas).map(nota => JSON.parse(nota))
    }))[0]; // Solo necesitamos el primer cliente (el único que debería haber para una cuenta específica)

    res.json(cliente);
  } catch (error) {
    console.error('Error fetching client with pending and paid notes', error);
    res.status(500).send('Error fetching client with pending and paid notes');
  }
};

// Cargar datos desde un archivo JSON
const uploadJsonData = async (req, res) => {
  const clients = req.body;
  try {
    await ClienteMobile.destroy({ where: {} }); // Borra todos los registros existentes
    const newClientes = await ClienteMobile.bulkCreate(clients); // Carga los nuevos datos desde el JSON
    res.status(201).json(newClientes);
  } catch (error) {
    res.status(500).send('Error loading JSON data');
  }
};

const getClienteByEmpresaAndCuenta = async (req, res) => {
  const { empresa_id, cuenta } = req.params;

  try {
    const cliente = await ClienteMobile.findOne({
      where: { empresa_id, cuenta }
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).send('Cliente no encontrado');
    }
  } catch (error) {
    console.error('Error fetching client by empresa and cuenta', error);
    res.status(500).send('Error fetching client by empresa and cuenta');
  }
};

module.exports = {
  getClientesMobile,
  getClientesByEmpresa,
  getClientesConNotasPendientes,
  getClienteByCuenta,
  uploadJsonData,
  getClienteByEmpresaAndCuenta
};
