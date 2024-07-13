// src/mobile/controllers/logsController.js
const LogsMobile = require('../models/logsMobile');
const moment = require('moment-timezone');

// Obtener todos los logs
const getLogs = async (req, res) => {
    try {
        const logs = await LogsMobile.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).send('Error al obtener los logs');
    }
}

// Agregar un nuevo log
const addLog = async (req, res) => {
    const { codigo_id, empresa_id, cobrador_id, success, detalle } = req.body;
    try {
        const now = moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss');
        const newLog = await LogsMobile.create({ codigo_id, registro: now, empresa_id, cobrador_id, success, detalle });
        res.status(201).json(newLog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el nuevo log');
    }
}

module.exports = {
    getLogs,
    addLog
}