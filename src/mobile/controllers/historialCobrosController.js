const HistorialCobros = require('../models/historialCobrosMobile');
const moment = require('moment-timezone');

const crearRegistro = async (req, res) => {
    const { empresa_id, cobrador_id, nombre_cliente, monto } = req.body;
    try {
        const fechaHoraBolivia = moment().tz('America/La_Paz');
        const nuevoRegistro = await HistorialCobros.create({
            empresa_id,
            cobrador_id,
            nombre_cliente,
            monto,
            fecha: fechaHoraBolivia.format('YYYY-MM-DD'),
            hora: fechaHoraBolivia.format('HH:mm:ss'),
        });
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el registro' });
    }
};

const obtenerRegistros = async (req, res) => {
    const { empresa_id, cobrador_id, filtro } = req.params;
    let whereClause = {
        empresa_id,
        cobrador_id
    };

    if (filtro) {
        const hoy = moment().tz('America/La_Paz');
        let fechaInicio;

        switch (filtro) {
            case 'hoy':
                fechaInicio = hoy.startOf('day');
                break;
            case 'ayer':
                fechaInicio = hoy.subtract(1, 'days').startOf('day');
                break;
            case 'ultima_semana':
                fechaInicio = hoy.subtract(7, 'days').startOf('day');
                break;
            case 'ultimo_mes':
                fechaInicio = hoy.subtract(1, 'months').startOf('day');
                break;
            default:
                fechaInicio = null;
        }

        if (fechaInicio) {
            whereClause.fecha = {
                [Op.gte]: fechaInicio.format('YYYY-MM-DD')
            };
        }
    }

    try {
        const registros = await HistorialCobros.findAll({ where: whereClause });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los registros' });
    }
};

module.exports = {
    crearRegistro,
    obtenerRegistros,
};
